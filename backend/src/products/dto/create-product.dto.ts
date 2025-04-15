import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  IsNotEmpty,
  IsUUID,
  IsOptional,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    example: 'Premium Headphones',
    description: 'Product name',
    required: true
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'Noise cancelling wireless headphones',
    description: 'Product description',
    required: false
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    example: 299.99,
    description: 'Product price',
    type: Number,
    required: true
  })
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty({
    example: 50,
    description: 'Available stock quantity',
    type: Number,
    required: true
  })
  @IsNumber()
  @IsNotEmpty()
  stock: number;

  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'Category ID this product belongs to',
    required: true
  })
  @IsUUID()
  @IsNotEmpty()
  categoryId: string;

  @ApiProperty({
    example: 'https://example.com/product.jpg',
    description: 'Product image URL',
    required: false
  })
  @IsString()
  @IsOptional()
  imageUrl?: string;
}