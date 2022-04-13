import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
  constructor() {
    super({
      jwtFromRequest: (req) =>
        req.headers.cookie
          .split('; ')
          .filter((el) => el.includes('refreshToken='))[0]
          .replace('refreshToken=', ''),
      secretOrKey: 'myRefreshKey',
    });
  }

  validate(payload) {
    console.log(payload);
    return {
      id: payload.sub,
      email: payload.email,
    };
  }
}
