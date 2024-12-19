import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';
import {
  BillingProperties,
  UserProperties,
} from 'src/main/constants/api.constants';

export class BillingDataDto {
  @ApiProperty(UserProperties.firstName)
  @IsString()
  @IsNotEmpty()
  firstName: string;
  @ApiProperty(UserProperties.lastName)
  @IsString()
  @IsNotEmpty()
  lastName: string;
  @ApiProperty(UserProperties.email)
  @IsString()
  @IsNotEmpty()
  email: string;
  @ApiProperty(UserProperties.phoneNumber)
  @IsString()
  @IsNotEmpty()
  phoneNumber: string;
  @ApiProperty(BillingProperties.address)
  @IsString()
  @IsNotEmpty()
  address: string;
  @ApiProperty(BillingProperties.country)
  @IsString()
  @IsNotEmpty()
  country: string;
  @ApiProperty(BillingProperties.city)
  @IsString()
  @IsNotEmpty()
  city: string;
  @ApiProperty(BillingProperties.zipCode)
  @IsString()
  @IsNotEmpty()
  zipCode: string;
  @ApiProperty(BillingProperties.notes)
  @IsOptional()
  @IsString()
  notes?: string;
  @ApiProperty(BillingProperties.agreeToPolicy)
  @IsBoolean()
  agreeToPolicy?: boolean;
  @ApiProperty(BillingProperties.agreeToEmails)
  @IsOptional()
  @IsBoolean()
  agreeToEmails?: boolean;
}
