import { Module, Type } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { ConfigModule } from '@nestjs/config';
import { SubmissionProcessor } from './worker/submission.processor';
import { SubmissionService } from './submissions/submission.service';
import { SubmissionController } from './submissions/submission.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    BullModule.forRoot({
      connection: {
        host: process.env.REDIS_HOST || 'redis',
        port: parseInt(process.env.REDIS_PORT || '6379', 10),
      },
    }),

    BullModule.registerQueue({
      name: 'submissions',
    }),
  ],
  controllers: [SubmissionController as Type<any>],
  providers: [SubmissionProcessor as Type<any>, SubmissionService as Type<any>],
})
export class AppModule {}
