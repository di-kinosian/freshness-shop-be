import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class GetCitiesDto {
  @ApiProperty({
    description: 'Name of selected country',
    example: 'ukraine',
  })
  @IsNotEmpty()
  @IsString()
  country: string;
}
