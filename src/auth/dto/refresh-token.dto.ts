import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { RefreshTokenProperties } from 'src/main/constants/api.constants';

export class RefreshTokenDto {
  @ApiProperty({
    description: RefreshTokenProperties.refreshToken.description,
    example: RefreshTokenProperties.refreshToken.example,
  })

  @IsString()
  refreshToken: string;
}
