import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ChallengesHttpModule } from './presentation/challenges/challenges.module';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ChallengesHttpModule
  ],
})
export class AppModule {}