import { Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CategoryResponseDto {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'Category ID',
  })
  @Expose()
  id: string;

  @ApiProperty({
    example: 'Electronics',
    description: 'Category name',
  })
  @Expose()
  name: string;

  @ApiProperty({
    example: 'All electronic devices',
    description: 'Category description',
    required: false,
  })
  @Expose()
  description: string;

  @ApiProperty({
    example: 'https://example.com/category.jpg',
    description: 'Category image URL',
    required: false,
  })
  @Expose()
  imageUrl: string;

  @ApiProperty({
    type: () => CategoryResponseDto,
    description: 'Parent category',
    required: false,
  })
  @Expose()
  @Type(() => CategoryResponseDto)
  parent?: CategoryResponseDto;

  @ApiProperty({
    type: () => [CategoryResponseDto],
    description: 'Child categories',
    required: false,
  })
  @Expose()
  @Type(() => CategoryResponseDto)
  children?: CategoryResponseDto[];
}
