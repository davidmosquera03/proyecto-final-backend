// ai-challenge.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AiChallengeController } from './ai-challenge.controller';
import { AiChallengeService } from './ai-challenge.service';

@Module({
  imports: [ConfigModule],
  controllers: [AiChallengeController],
  providers: [AiChallengeService],
})
export class AiChallengeModule {}

