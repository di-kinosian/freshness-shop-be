import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../users/user.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/schemas/user.schema';
import { JwtConstants } from 'src/main/constants/api.constants';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(email);

    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user.toObject();
      return result;
    }

    return null;
  }

  async generateRefreshToken(user: User) {
    const payload = { email: user.email, sub: user._id };

    return this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: JwtConstants.EXPIRES_IN_REFRESH,
    });
  }

  async generateAccessToken(user: User) {
    const payload = { email: user.email, sub: user._id };

    return this.jwtService.sign(payload);
  }

  async login(user: User) {
    const accessToken = await this.generateAccessToken(user);

    const refreshToken = await this.generateRefreshToken(user);

    await this.userService.updateRefreshToken(user._id, refreshToken);

    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    };
  }
}
