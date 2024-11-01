import {
  Body,
  Controller,
  Post,
  Get,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { User } from './schemas/user.schema';
import { SummaryConstants } from 'src/main/constants/api.constants';

@ApiTags('User')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  @ApiOperation({ summary: SummaryConstants.USER_REGISTRATION })
  async signUp(
    @Body() createUserDto: CreateUserDto,
  ): Promise<{ user: User; accessToken: string }> {
    return this.userService.createUser(createUserDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @Get('profile')
  getProfile(@Request() req) {
    return {
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      email: req.user.email,
      phoneNumber: req.user.phoneNumber,
    };
  }
}
