import {
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { CreateCategoryDto, UpdateCategoryDto } from './dto';

export const ApiGetCategories = () =>
  ApiOperation({ summary: 'Get all categories' }) &&
  ApiResponse({ status: 200, description: 'Category list' }) &&
  ApiQuery({
    name: 'withRelations',
    required: false,
    type: Boolean,
    description: 'Include parent/child relationships',
  });

export const ApiGetCategoryTree = () =>
  ApiOperation({ summary: 'Get category hierarchy tree' }) &&
  ApiResponse({ status: 200, description: 'Category tree structure' });

export const ApiGetCategory = () =>
  ApiOperation({ summary: 'Get category details' }) &&
  ApiResponse({ status: 200, description: 'Category details' }) &&
  ApiResponse({ status: 404, description: 'Category not found' }) &&
  ApiParam({ name: 'id', type: String, example: 'uuid' });

export const ApiCreateCategory = () =>
  ApiOperation({ summary: 'Create new category' }) &&
  ApiResponse({ status: 201, description: 'Category created' }) &&
  ApiResponse({ status: 404, description: 'Parent category not found' }) &&
  ApiBody({ type: CreateCategoryDto });

export const ApiUpdateCategory = () =>
  ApiOperation({ summary: 'Update category' }) &&
  ApiResponse({ status: 200, description: 'Category updated' }) &&
  ApiResponse({ status: 404, description: 'Category not found' }) &&
  ApiParam({ name: 'id', type: String, example: 'uuid' }) &&
  ApiBody({ type: UpdateCategoryDto });

export const ApiDeleteCategory = () =>
  ApiOperation({ summary: 'Delete category' }) &&
  ApiResponse({ status: 200, description: 'Category deleted' }) &&
  ApiResponse({ status: 404, description: 'Category not found' }) &&
  ApiResponse({ status: 409, description: 'Category has products/children' }) &&
  ApiParam({ name: 'id', type: String, example: 'uuid' });
