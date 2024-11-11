import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '../users/user.service';
import { LoginUserDto } from './dto/login-user.dto';
import { ErrorMessages, Messages } from 'src/main/constants/messages.constants';
import { JwtService } from '@nestjs/jwt';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('login')
  async login(@Body() loginDto: LoginUserDto) {
    const user = await this.authService.validateUser(
      loginDto.email,
      loginDto.password,
    );
    if (!user) {
      throw new UnauthorizedException(ErrorMessages.INVALID_EMAIL);
    }
    return this.authService.login(user);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @Post('refresh-token')
  async refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
    const { refreshToken } = refreshTokenDto;

    if (!refreshToken) {
      throw new UnauthorizedException(
        ErrorMessages.REFRESH_TOKEN_IS_NOT_PROVIDED,
      );
    }

    const user = await this.userService.findByRefreshToken(refreshToken);

    if (!user) {
      throw new UnauthorizedException(ErrorMessages.REFRESH_TOKEN_IS_INVALID);
    }

    const newAccessToken = this.jwtService.sign({
      email: user.email,
      sub: user._id,
    });

    return { accessToken: newAccessToken };
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @Post('logout')
  async logout(@Body() refreshTokenDto: RefreshTokenDto) {
    const { refreshToken } = refreshTokenDto;

    if (!refreshToken) {
      throw new UnauthorizedException(
        ErrorMessages.REFRESH_TOKEN_IS_NOT_PROVIDED,
      );
    }

    const user = await this.userService.findByRefreshToken(refreshToken);
    if (!user) {
      throw new UnauthorizedException(ErrorMessages.REFRESH_TOKEN_IS_INVALID);
    }

    await this.userService.updateRefreshToken(user._id, '');
    return { message: Messages.LOGOUT_SUCCESSFULLY };
  }
}
