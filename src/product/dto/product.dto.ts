import { ApiProperty } from '@nestjs/swagger';

export class ProductDto {
  @ApiProperty({
    description: 'Product id',
    required: false,
  })
  id: string;
}
