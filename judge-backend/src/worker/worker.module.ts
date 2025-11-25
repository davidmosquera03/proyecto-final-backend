import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SubmissionProcessor } from './submission.processor';
import { PrismaService } from '../infrastructure/prisma.service';
import { RunnerService } from 'src/runners/runner.service';
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
  ],
  providers: [SubmissionProcessor, PrismaService, RunnerService],
})
export class WorkerModule {}
