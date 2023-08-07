import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtClaimDtoType } from 'src/schema';
import { getProcessEnv } from 'src/utils/env';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: getProcessEnv('SECRET'),
    });
  }

  async validate(payload: JwtClaimDtoType) {
    if (!payload.sub || !payload.email || !payload.name) {
      console.error('invalid jwt payload', payload);
      throw new UnauthorizedException();
    }
    const user = await this.authService.validateUserById(
      payload.sub,
      payload.email,
      payload.name,
    );
    if (!user) {
      console.error('user not found', payload);
      throw new UnauthorizedException();
    }
    return { id: payload.sub, email: payload.email };
  }
}
