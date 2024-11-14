import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSubCategoryDto {
  @ApiProperty({ description: 'Name of the subcategory' })
  @IsString()
  @IsNotEmpty()
  name: string;
}
