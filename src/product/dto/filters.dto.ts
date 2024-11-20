import { ApiProperty } from '@nestjs/swagger';
import {
  IsOptional,
  IsNumber,
  IsArray,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class ProductFiltersDto {
  // @ApiProperty({ description: 'CategoryId of the product', required: false })
  // @IsOptional()
  // @IsString()
  // category?: string;

  @ApiProperty({
    description: 'List of brands (e.g., ["Sony", "Samsung"])',
    required: false,
    type: [String],
  })
  @IsOptional()
  @IsArray()
  @Transform(({ value }) =>
    typeof value === 'string' ? value.split(',') : value,
  )
  brands?: string[];

  @ApiProperty({
    description: 'Minimum price for the product',
    required: false,
    type: Number,
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  priceMin?: number;

  @ApiProperty({
    description: 'Maximum price for the product',
    required: false,
    type: Number,
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  priceMax?: number;

  @ApiProperty({
    description: 'List of ratings (e.g., [4, 5])',
    required: false,
    type: [Number],
  })
  @IsOptional()
  @IsArray()
  @Transform(({ value }) =>
    typeof value === 'string' ? value.split(',').map(Number) : value,
  )
  rating?: number[];

  @ApiProperty({
    description: 'Page number for pagination',
    required: false,
    type: Number,
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  page?: number;

  @ApiProperty({
    description: 'Number of items per page',
    required: false,
    type: Number,
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  limit?: number;
}
