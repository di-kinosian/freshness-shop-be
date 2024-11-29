import { IsMongoId } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserProperties } from 'src/main/constants/api.constants';
import { ErrorMessages } from 'src/main/constants/messages.constants';

export class UpdateWishListDto {
  @ApiProperty({
    description: UserProperties.wishList.description,
    example: UserProperties.wishList.example,
  })
  @IsMongoId({ message: ErrorMessages.INVALID_PRODUCT_ID_FORMAT })
  productId: string;
}
