import {
  IsEmail,
  IsNotEmpty,
  Matches,
  MinLength,
  IsOptional,
  IsArray,
  IsMongoId,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { UserProperties } from 'src/main/constants/api.constants';
import {
  emailValidation,
  firstNameValidation,
  lastNameValidation,
  passwordValidation,
  phoneNumberValidation,
} from 'src/main/constants/validation.constants';
import { validationMessages } from 'src/main/constants/messages.constants';

export class CreateUserDto {
  @ApiProperty(UserProperties.firstName)
  @IsNotEmpty({ message: firstNameValidation.message })
  firstName: string;

  @ApiProperty(UserProperties.lastName)
  @IsNotEmpty({ message: lastNameValidation.message })
  lastName: string;

  @ApiProperty(UserProperties.email)
  @IsEmail({}, { message: emailValidation.message })
  email: string;

  @ApiProperty(UserProperties.password)
  @IsNotEmpty()
  @MinLength(passwordValidation.minLength)
  @Matches(passwordValidation.regex, {
    message: validationMessages.passwordComplexity,
  })
  password: string;

  @ApiPropertyOptional(UserProperties.phoneNumber)
  @IsOptional()
  @Matches(phoneNumberValidation.regex, {
    message: validationMessages.phoneNumberFormat,
  })
  phoneNumber?: string;

  @ApiProperty(UserProperties.wishList)
  @IsArray()
  @IsOptional()
  @IsMongoId({
    each: true,
    message: validationMessages.withListItemFormat,
  })
  wishList: string[];
}
