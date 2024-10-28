import {
  IsEmail,
  IsNotEmpty,
  Matches,
  MinLength,
  IsOptional,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: 'User first name', example: 'John' })
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ description: 'User last name', example: 'Doe' })
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({
    description: 'User email address',
    example: 'john.doe@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description:
      'User password. Must contain at least 2 lowercase, 2 uppercase, 2 digits, and 2 special characters.',
    example: 'Aa12@@bb',
  })
  @IsNotEmpty()
  @MinLength(8)
  @Matches(/(?=.*[a-z]{2,})(?=.*[A-Z]{2,})(?=.*\d{2,})(?=.*[@$!%*?&]{2,})/, {
    message:
      'Password must contain at least 2 lowercase, 2 uppercase, 2 digits, and 2 special characters',
  })
  password: string;

  @ApiPropertyOptional({
    description: 'User phone number',
    example: '+1234567890',
  })
  @IsOptional()
  phoneNumber?: string;
}
