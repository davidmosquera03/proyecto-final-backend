import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ChallengesHttpModule } from './presentation/challenges/challenges.module';
import { UsersModule } from './presentation/users/users.module';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ChallengesHttpModule,
    UsersModule,
  ],
})
export class AppModule {}