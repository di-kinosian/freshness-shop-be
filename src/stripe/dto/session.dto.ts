import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsString, ValidateNested } from 'class-validator';
import { CreateCheckoutSessionProperties } from 'src/main/constants/api.constants';
import {  OrderProductDto, ProductDto } from 'src/product/dto/order-product.dto';

export class CreateCheckoutSessionDto {
  @IsArray()
  @ApiProperty(CreateCheckoutSessionProperties.products)
  products: OrderProductDto[];
  @IsString()
  orderId: string;
}
