import {
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { CreateProductDto, UpdateProductDto, FilterProductsDto } from './dto';

export const ApiFindAllProducts = () =>
  ApiOperation({ summary: 'Get all products (with optional filters)' }) &&
  ApiResponse({ status: 200, description: 'List of products' }) &&
  ApiQuery({ name: 'limit', required: false, type: Number, example: 10 }) &&
  ApiQuery({ name: 'offset', required: false, type: Number, example: 0 }) &&
  ApiQuery({ name: 'minPrice', required: false, type: Number, example: 100 }) &&
  ApiQuery({ name: 'maxPrice', required: false, type: Number, example: 500 }) &&
  ApiQuery({
    name: 'categoryId',
    required: false,
    type: String,
    example: 'uuid',
  }) &&
  ApiQuery({
    name: 'search',
    required: false,
    type: String,
    example: 'premium',
  });

export const ApiFindOneProduct = () =>
  ApiOperation({ summary: 'Get single product details' }) &&
  ApiResponse({ status: 200, description: 'Product details' }) &&
  ApiResponse({ status: 404, description: 'Product not found' }) &&
  ApiParam({ name: 'id', type: String, example: 'product-uuid' });

export const ApiCreateProduct = () =>
  ApiOperation({ summary: 'Create new product' }) &&
  ApiResponse({ status: 201, description: 'Product created successfully' }) &&
  ApiResponse({ status: 400, description: 'Invalid input data' }) &&
  ApiResponse({ status: 404, description: 'Category not found' }) &&
  ApiBody({ type: CreateProductDto });

export const ApiUpdateProduct = () =>
  ApiOperation({ summary: 'Update product details' }) &&
  ApiResponse({ status: 200, description: 'Product updated successfully' }) &&
  ApiResponse({ status: 404, description: 'Product not found' }) &&
  ApiParam({ name: 'id', type: String, example: 'product-uuid' }) &&
  ApiBody({ type: UpdateProductDto });

export const ApiDeleteProduct = () =>
  ApiOperation({ summary: 'Delete product' }) &&
  ApiResponse({ status: 200, description: 'Product deleted successfully' }) &&
  ApiResponse({ status: 404, description: 'Product not found' }) &&
  ApiParam({ name: 'id', type: String, example: 'product-uuid' });
