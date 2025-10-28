import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_ACCESS_SECRET') || process.env.JWT_ACCESS_SECRET || configService.get<string>('JWT_SECRET') || process.env.JWT_SECRET || 'default_jwt_secret',
    });
  }

  async validate(payload: any) {
    // payload expected: { sub: userId, email, role }
    // Puede retornarse el payload o buscar usuario real:
    const user = await this.authService.validateUserFromJwtPayload(payload);
    // Si no hay método, retornar payload como fallback:
    return user ?? payload;
  }
}
