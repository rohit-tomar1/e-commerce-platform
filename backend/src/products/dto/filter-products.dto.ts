import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, IsUUID, Min } from 'class-validator';

export class FilterProductsDto {
  @ApiProperty({
    example: 10,
    description: 'Maximum number of results',
    required: false,
    default: 10,
    minimum: 0,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  limit?: number;

  @ApiProperty({
    example: 0,
    description: 'Number of results to skip',
    required: false,
    default: 0,
    minimum: 0,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  offset?: number;

  @ApiProperty({
    example: 100,
    description: 'Minimum product price',
    required: false,
    type: Number,
  })
  @IsOptional()
  @IsNumber()
  minPrice?: number;

  @ApiProperty({
    example: 500,
    description: 'Maximum product price',
    required: false,
    type: Number,
  })
  @IsOptional()
  @IsNumber()
  maxPrice?: number;

  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'Filter by category ID',
    required: false,
  })
  @IsOptional()
  @IsUUID()
  categoryId?: string;

  @ApiProperty({
    example: 'wireless',
    description: 'Search term for product name',
    required: false,
  })
  @IsOptional()
  @IsString()
  search?: string;
}
