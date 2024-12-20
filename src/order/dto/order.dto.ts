import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  Min,
  IsEnum,
  IsArray,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { OrderStatus, PaymentStatus } from '../types';
import { OrderProductDto } from 'src/product/dto/order-product.dto';
import { BillingDataDto } from './billing-info.dto';
import { CreateOrderProperties } from 'src/main/constants/api.constants';
import { Type } from 'class-transformer';

export class CreateOrderDto {
  @ApiProperty(CreateOrderProperties.userId)
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  userId: string;
  @ApiProperty({
    description: CreateOrderProperties.status.description,
    example: OrderStatus.PENDING,
    enum: OrderStatus,
  })
  @IsEnum(OrderStatus)
  status: OrderStatus;
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderProductDto)
  products: OrderProductDto[];
  @ApiProperty({
    description: CreateOrderProperties.billingInfo.description,
    type: BillingDataDto,
  })
  @ValidateNested()
  @Type(() => BillingDataDto)
  billingInfo: BillingDataDto;
  @ApiProperty({
    description: CreateOrderProperties.paymentStatus.description,
    example: PaymentStatus.UNPAID,
    enum: PaymentStatus,
  })
  @IsEnum(PaymentStatus)
  paymentStatus: PaymentStatus;
  @ApiProperty({
    description: CreateOrderProperties.totalAmount.description,
    example: 299.99,
  })
  @IsNumber()
  @Min(0)
  totalAmount: number;
}

export class ConfirmOrderDto {
  @ApiProperty({
    description: 'Id that is formed by stripe',
    example: '',
  })
  @IsString()
  sessionId: string;
}
