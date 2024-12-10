import {
  IsString,
  IsNotEmpty,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { CartProperties } from 'src/main/constants/api.constants';
import { CartItemDto } from './cart-item.dto';

export class CreateCartDto {
  @ApiProperty(CartProperties.userId)
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({
    description: CartProperties.items.description,
    type: [CartItemDto],
    example: CartProperties.items.example,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CartItemDto)
  items: CartItemDto[];
}
