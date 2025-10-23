import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { AuthService } from '../../auth/auth.service';
import { PrismaService } from '../../infrastructure/prisma.service';
import { PrismaUserRepository } from '../../infrastructure/repositories/prisma-user.repository';
import { JwtStrategy } from '../../auth/strategies/jwt.strategy';

@Module({
  imports: [
    ConfigModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_ACCESS_SECRET') || 'default_jwt_secret',
        signOptions: { expiresIn: '15m' },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, PrismaService, PrismaUserRepository, JwtStrategy],
  exports: [AuthService, PrismaUserRepository],
})
export class UsersModule {}
