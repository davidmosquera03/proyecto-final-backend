import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaUserRepository } from '../infrastructure/repositories/prisma-user.repository';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userRepo: PrismaUserRepository,
  ) {}

  async generateAccessToken(userId: string, email: string, role: string) {
    const payload = { sub: userId, email, role };
    const token = this.jwtService.sign(payload, { expiresIn: '15m' });
    return token;
  }

  async validateAccessToken(token: string) {
    try {
      return this.jwtService.verify(token);
    } catch (e) {
      return null;
    }
  }
}
