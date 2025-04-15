import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  async findAllCategories(withRelations = false) {
    return this.categoriesRepository.find({
      relations: withRelations ? ['parent', 'children'] : [],
    });
  }

  async findCategoryTree() {
    const categories = await this.categoriesRepository.find({
      relations: ['children'],
    });
    return categories.filter((category) => !category.parentId);
  }

  async findOneCategory(id: string) {
    const category = await this.categoriesRepository.findOne({
      where: { id },
      relations: ['parent', 'children', 'products'],
    });

    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }

    return category;
  }

  async createCategory(createCategoryDto: CreateCategoryDto) {
    let parent;

    if (createCategoryDto.parentId) {
      parent = await this.categoriesRepository.findOneBy({
        id: createCategoryDto.parentId,
      });
      if (!parent) {
        throw new NotFoundException(
          `Parent category with ID ${createCategoryDto.parentId} not found`,
        );
      }
    }

    const category = this.categoriesRepository.create({
      ...createCategoryDto,
      parent,
    });

    return this.categoriesRepository.save(category);
  }

  async updateCategory(id: string, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.categoriesRepository.preload({
      id,
      ...updateCategoryDto,
    });

    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }

    if (updateCategoryDto.parentId) {
      const parentCat = await this.categoriesRepository.findOneBy({
        id: updateCategoryDto.parentId,
      });

      if (!parentCat) {
        throw new NotFoundException(
          `Parent category with ID ${updateCategoryDto.parentId} not found`,
        );
      }
      category.parent = parentCat;
    }

    return this.categoriesRepository.save(category);
  }

  async removeCategory(id: string) {
    const category = await this.findOneCategory(id);

    // Prevent deletion if category has products
    if (category.products && category.products.length > 0) {
      throw new ConflictException(
        'Cannot delete category with associated products',
      );
    }

    // Handle child categories
    if (category.children && category.children.length > 0) {
      await Promise.all(
        category.children.map((child) =>
          this.categoriesRepository.save({ ...child, parentId: '' }),
        ),
      );
    }

    return this.categoriesRepository.remove(category);
  }
}
