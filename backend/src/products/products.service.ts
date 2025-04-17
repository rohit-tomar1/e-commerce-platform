import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindManyOptions, Between, Like } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto, UpdateProductDto, FilterProductsDto } from './dto';
import { Category } from '../categories/entities/category.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  async findAll(filterDto?: FilterProductsDto) {
    const {
      limit = 10,
      offset = 0,
      minPrice,
      maxPrice,
      categoryId,
      search,
    } = filterDto || {};

    const where: FindManyOptions<Product>['where'] = {};

    if (minPrice !== undefined || maxPrice !== undefined) {
      where.price = Between(minPrice || 0, maxPrice || Number.MAX_SAFE_INTEGER);
    }

    if (categoryId) {
      where.categoryId = categoryId;
    }

    if (search) {
      where.name = Like(`%${search}%`);
    }
    console.log({where})
    return this.productsRepository.find({
      where,
      relations: ['category'],
      take: limit,
      skip: offset,
    });
  }

  async findOne(id: string) {
    const product = await this.productsRepository.findOne({
      where: { id },
      relations: ['category'],
    });

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    return product;
  }

  async create(createProductDto: CreateProductDto) {
    const category = await this.categoriesRepository.findOneBy({
      id: createProductDto.categoryId,
    });

    if (!category) {
      throw new NotFoundException(
        `Category with ID ${createProductDto.categoryId} not found`,
      );
    }

    const product = this.productsRepository.create(createProductDto);
    return this.productsRepository.save(product);
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const product = await this.productsRepository.preload({
      id,
      ...updateProductDto,
    });

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    return this.productsRepository.save(product);
  }

  async remove(id: string) {
    const product = await this.findOne(id);
    return this.productsRepository.remove(product);
  }
}
