import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { AdditionalInformation } from '../product.types';
import {
  OrderProductProperties,
  ProductProperties,
} from 'src/main/constants/api.constants';

export class ProductDto {
  @ApiProperty(ProductProperties._id)
  @IsString()
  @IsNotEmpty()
  _id: string;

  @ApiProperty(ProductProperties.title)
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty(ProductProperties.description)
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty(ProductProperties.rating)
  @IsOptional()
  @IsNumber()
  @Min(0)
  rating?: number;

  @ApiProperty(ProductProperties.price)
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty(ProductProperties.quantity)
  @IsNumber()
  @Min(0)
  quantity: number;

  @ApiProperty(ProductProperties.brand)
  @IsString()
  @IsOptional()
  brand: string;

  @ApiProperty(ProductProperties.country)
  @IsString()
  @IsNotEmpty()
  country: string;

  @ApiProperty(ProductProperties.images)
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  images: string[];

  @ApiProperty(ProductProperties.discount)
  @IsNumber()
  @IsOptional()
  @Min(0)
  discount?: number;

  @ApiProperty(ProductProperties.categoryId)
  @IsString()
  @IsNotEmpty()
  categoryId: string;

  @ApiProperty(ProductProperties.subcategoryId)
  @IsString()
  @IsNotEmpty()
  subcategoryId: string;

  @ApiProperty(ProductProperties.additionalInformation)
  @IsOptional()
  @IsNotEmpty()
  additionalInformation: AdditionalInformation[];

  @IsOptional()
  __v: number;
}

export class OrderProductDto {
  @ApiProperty(OrderProductProperties.product)
  @ValidateNested()
  @Type(() => ProductDto)
  product: ProductDto;

  @ApiProperty(OrderProductProperties.quantity)
  @IsNumber()
  @Min(1)
  quantity: number;
}
