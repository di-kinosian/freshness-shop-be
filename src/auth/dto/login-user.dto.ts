// import { IsEmail, IsNotEmpty } from 'class-validator';

// export class LoginUserDto {
//   @IsEmail()
//   email: string;

//   @IsNotEmpty()
//   password: string;
// }

// auth/dto/login-user.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({
    description: 'The email of the user',
    example: 'example@domain.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'The password of the user',
    example: 'PP12@@bb',
  })
  @IsString()
  password: string;
}
