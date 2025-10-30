import { Injectable } from '@nestjs/common';
import { IUserRepository } from 'src/domain/users/user.repository.port';
import { PrismaService } from "../prisma.service";
import { User } from 'src/domain/users/user.entity';

@Injectable()
export class PrismaUserRepository implements IUserRepository {
  constructor(private prisma: PrismaService) {}

  async create(userData: { email: string; password: string; role: 'ADMIN' | 'STUDENT' }): Promise<User> {
    const u = await this.prisma.user.create({
      data: {
        email: userData.email,
        password: userData.password,
        role: userData.role,
      },
    });
    return new User(u.id, u.email, u.password, u.role as 'ADMIN' | 'STUDENT');
  }

  async findByEmail(email: string): Promise<User | null> {
    const u = await this.prisma.user.findUnique({ where: { email } });
    return u ? new User(u.id, u.email, u.password, u.role as 'ADMIN' | 'STUDENT') : null;
  }

  async findById(id: string): Promise<User | null> {
    const u = await this.prisma.user.findUnique({ where: { id } });
    return u ? new User(u.id, u.email, u.password, u.role as 'ADMIN' | 'STUDENT') : null;
  }

  async updateHashedRefreshToken(userId: string, hashed: string | null): Promise<void> {
    // Omitido si decides no guardar refresh tokens
    await this.prisma.user.update({
      where: { id: userId },
      data: {}, // sin refresh token, vacío
    });
  }
}
