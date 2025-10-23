import { Processor, WorkerHost, OnWorkerEvent } from '@nestjs/bullmq';
import { Job } from 'bullmq';

interface SubmissionJob {
  code: string;
  language: string;
  userId?: string;
}

@Processor('submissions')
export class SubmissionProcessor extends WorkerHost {
  async process(
    job: Job<SubmissionJob>,
  ): Promise<{ result: string; data: SubmissionJob }> {
    console.log(`Procesando job ${job.id}...`);
    console.log('Datos:', job.data);

    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simula trabajo

    console.log(`Job completado ${job.id}`);
    return { result: 'OK', data: job.data };
  }

  @OnWorkerEvent('completed')
  onCompleted(job: Job) {
    console.log(`🎉 Job completado: ${job.id}`);
  }

  @OnWorkerEvent('failed')
  onFailed(job: Job, err: Error) {
    console.error(`Job falló ${job.id}: ${err.message}`);
  }
}
