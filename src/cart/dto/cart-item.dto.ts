import { IsString, IsNotEmpty, IsNumber, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CartItemProperties } from 'src/main/constants/api.constants';

export class CartItemDto {
  @ApiProperty({
    description: CartItemProperties.productId.description,
    example: CartItemProperties.productId.example,
  })
  @IsString()
  @IsNotEmpty()
  productId: string;

  @ApiProperty({
    description: CartItemProperties.quantity.description,
    example: CartItemProperties.quantity.example,
    minimum: 1,
  })
  @IsNumber()
  @Min(1)
  quantity: number;
}
