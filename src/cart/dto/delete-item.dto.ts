import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import { CartItemProperties } from "src/main/constants/api.constants";

export class DeleteFromCartDto {
  @ApiProperty({
    description: CartItemProperties.productId.description,
    example: CartItemProperties.productId.example,
  })
  @IsString()
  @IsNotEmpty()
  productId: string;
}
