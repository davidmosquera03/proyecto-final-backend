import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Injectable()
export class SubmissionService {
  constructor(@InjectQueue('submissions') private queue: Queue) {}

  async addJob(data: { code: string; language: string; userId?: string }) {
    const job = await this.queue.add('submission-job', data);
    return { message: 'Job added to queue', jobId: job.id };
  }
}
