import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';
import { UserProperties } from 'src/main/constants/api.constants';

export class LoginUserDto {
  @ApiProperty({
    description: UserProperties.email.description,
    example: UserProperties.email.example,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: UserProperties.password.description,
    example: UserProperties.password.example,
  })
  @IsString()
  password: string;
}
