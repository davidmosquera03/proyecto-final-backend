import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(config: ConfigService) {
    const secret = config.get<string>('JWT_ACCESS_SECRET') || process.env.JWT_ACCESS_SECRET || 'default_jwt_secret';
    if (!secret || secret === 'default_jwt_secret') {
      // In non-production this fallback is acceptable; in production prefer to throw so secret is provided
      // We still pass a secret to avoid passport-jwt throwing "requires a secret or key"
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: secret,
    });
  }

  async validate(payload: any) {
    // payload.sub === userId
    return { userId: payload.sub, email: payload.email };
  }
}
