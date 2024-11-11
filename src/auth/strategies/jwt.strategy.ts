import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Messages } from 'src/main/constants/messages.constants';
import { UserService } from 'src/users/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: process.env.JWT_SECRET,
      passReqToCallback: true,
    });
  }

  isTokenExpired(path: string, exp: number) {
    if (path === '/auth/refresh-token') return false;

    return exp < Date.now() / 1000;
  }

  async validate(req, payload) {
    if (this.isTokenExpired(req.route.path, payload.exp)) {
      throw new UnauthorizedException(Messages.TOKEN_IS_EXPIRED);
    }

    const user = await this.userService.findById(payload.sub);
    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
