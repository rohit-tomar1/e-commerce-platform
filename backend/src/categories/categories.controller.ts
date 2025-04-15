import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  Query,
  Version,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto, UpdateCategoryDto } from './dto';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import {
  ApiGetCategories,
  ApiGetCategoryTree,
  ApiGetCategory,
  ApiCreateCategory,
  ApiUpdateCategory,
  ApiDeleteCategory,
} from './categories.swagger';
import { Public } from 'src/common/decorators/public.decorator';
import { UserRole } from 'src/common/enums/user-role.enum';
import { Roles } from 'src/common/decorators/roles.decorator';
import { BEARER_AUTH_NAME } from 'src/config/constans';

@ApiTags('Categories')
@ApiBearerAuth(BEARER_AUTH_NAME)
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Public()
  @Get()
  @Version('1')
  @ApiGetCategories()
  findAll(@Query('withRelations') withRelations: string) {
    return this.categoriesService.findAllCategories(withRelations === 'true');
  }

  @Public()
  @Get('tree')
  @Version('1')
  @ApiGetCategoryTree()
  findTree() {
    return this.categoriesService.findCategoryTree();
  }

  @Public()
  @Get(':id')
  @Version('1')
  @ApiGetCategory()
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOneCategory(id);
  }

  @Roles(UserRole.ADMIN)
  @Post()
  @Version('1')
  @ApiCreateCategory()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.createCategory(createCategoryDto);
  }

  @Roles(UserRole.ADMIN)
  @Patch(':id')
  @Version('1')
  @ApiUpdateCategory()
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoriesService.updateCategory(id, updateCategoryDto);
  }

  @Roles(UserRole.ADMIN)
  @Delete(':id')
  @Version('1')
  @ApiDeleteCategory()
  remove(@Param('id') id: string) {
    return this.categoriesService.removeCategory(id);
  }
}
