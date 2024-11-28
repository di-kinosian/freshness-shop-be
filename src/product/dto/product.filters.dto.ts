import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsNumber, IsArray, IsString } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { FilteredProductProperties } from 'src/main/constants/api.constants';

export class GetFilteredProductsDto {
  @ApiProperty({
    description: FilteredProductProperties.categoryId.description,
    required: false,
    type: String,
  })
  @IsOptional()
  @IsString()
  categoryId?: string;

  @ApiProperty({
    description: FilteredProductProperties.brands.description,
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
    description: FilteredProductProperties.priceMin.description,
    required: false,
    type: Number,
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  priceMin?: number;

  @ApiProperty({
    description: FilteredProductProperties.priceMax.description,
    required: false,
    type: Number,
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  priceMax?: number;

  @ApiProperty({
    description: FilteredProductProperties.rating.description,
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
    description: FilteredProductProperties.page.description,
    required: false,
    type: Number,
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  page?: number;

  @ApiProperty({
    description: FilteredProductProperties.limit.description,
    required: false,
    type: Number,
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  limit?: number;

  @ApiProperty({
    description: FilteredProductProperties.sortField.description,
    required: false,
    type: String,
  })
  @IsOptional()
  @IsString()
  sortField?: string;

  @ApiProperty({
    description: FilteredProductProperties.sortDirection.description,
    required: false,
    type: String,
  })
  @IsOptional()
  @IsString()
  sortDirection?: string;
}
