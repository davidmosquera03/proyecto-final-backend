import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SubmissionService } from './submissions/submission.service';
import { SubmissionController } from './submissions/submission.controller';
import { PrismaService } from './infrastructure/prisma.service';
import { ChallengesHttpModule } from './presentation/challenges/challenges.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          connection: {
            host: configService.get<string>('REDIS_HOST', 'localhost'),
            port: parseInt(configService.get<string>('REDIS_PORT', '6379'), 10),
            password: configService.get<string>('REDIS_PASSWORD'),
            maxRetriesPerRequest: null,
            enableReadyCheck: false,
            retryStrategy: (times: number) => {
              const delay = Math.min(times * 50, 2000);
              return delay;
            },
          },
        };
      },
      inject: [ConfigService],
    }),

    BullModule.registerQueue({
      name: 'submissions',
      defaultJobOptions: {
        attempts: 3,
        backoff: {
          type: 'exponential',
          delay: 2000,
        },
        removeOnComplete: {
          age: 86400,
          count: 1000,
        },
        removeOnFail: {
          age: 604800,
        },
      },
    }),

    ChallengesHttpModule,
  ],
  controllers: [SubmissionController],
  providers: [SubmissionService, PrismaService],
  exports: [PrismaService],
})
export class AppModule {}
