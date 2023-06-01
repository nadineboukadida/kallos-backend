import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { jwtConstants } from './constants';

type JwtPayload = {
  email: string;
  sub: string;
  expiration: number
};

type JwtResponse = {
  userId: string;
  email: string;
};

export type RequestWithUser = {
  user: JwtResponse;
} & Request;

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: JwtPayload): Promise<JwtResponse> {
    const currentTime = Math.floor(Date.now() / 1000) + (60 * 60 * 1000);

    if (payload.expiration > currentTime) {
      throw new UnauthorizedException('Token has expired');
    }
    return { userId: payload.sub, email: payload.email };
  }
}
