import { Injectable, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IUserRepository } from 'src/domain/users/user.repository.port';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @Inject('IUserRepository') private userRepo: IUserRepository,
  ) {}

  async generateAccessToken(userId: string, email: string, role: string) {
    const payload = { sub: userId, email, role };
    const token = this.jwtService.sign(payload, { expiresIn: '15m' });
    return token;
  }
  async generateRefreshToken(userId: string, email: string, role: string) {
    const payload = { sub: userId, email, role };
    const token = this.jwtService.sign(payload, { expiresIn: '7d' });
    return token;
  }
  
  async validateAccessToken(token: string) {
    try {
      return this.jwtService.verify(token);
    } catch (e) {
      return null;
    }
  }

  // Used by JwtStrategy to map payload to an actual user entity (or null if not found)
  async validateUserFromJwtPayload(payload: any) {
    if (!payload || !payload.sub) return null;
    const user = await this.userRepo.findById(payload.sub);
    if (!user) return null;
    // Return a simplified user object that will be attached to req.user
    return { id: user.id, email: user.email, role: user.role };
  }
}
