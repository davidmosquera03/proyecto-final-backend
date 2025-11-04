import { Processor, WorkerHost, OnWorkerEvent } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../infrastructure/prisma.service';
import { SubmissionStatus, Language } from '../domain/submissions/submission.entity';
import { RunnerService } from 'src/runners/runner.service';

interface SubmissionJob {
  submissionId: string;
  code: string;
  language: Language;
  userId: string;
  challengeId: string;
}

@Injectable()
@Processor('submissions')
export class SubmissionProcessor extends WorkerHost {
  private readonly logger = new Logger(SubmissionProcessor.name);

 constructor(
  private readonly prisma: PrismaService,
  private readonly runner: RunnerService,
 ) {
  super();
 }

  async process(job: Job<SubmissionJob>): Promise<{ result: string; submissionId: string }> {
  const { submissionId, code, language } = job.data;
  this.logger.log(`Running submission ${submissionId}...`);

  await this.prisma.submission.update({
    where: { id: submissionId },
    data: { status: 'RUNNING' },
  });

  const { output } = await this.runner.runCode(language, code);

  this.logger.log(`Output for submission ${submissionId}:\n${output}`);

  await this.prisma.submission.update({
    where: { id: submissionId },
    data: {
      status: 'ACCEPTED', // placeholder, later depends on test results
      score: 100,
      testsPassed: 1,
      testsTotal: 1,
    },
  });

  return { result: 'OK', submissionId };
}

  @OnWorkerEvent('completed')
  onCompleted(job: Job) {
    this.logger.log(`Job completado: ${job.id} (Submission: ${job.data.submissionId})`);
  }

  @OnWorkerEvent('failed')
  onFailed(job: Job, err: Error) {
    this.logger.error(
      `Job falló ${job.id} (Submission: ${job.data?.submissionId || 'unknown'}): ${err.message}`,
      err.stack,
    );
  }

  @OnWorkerEvent('active')
  onActive(job: Job) {
    this.logger.log(`Job activo: ${job.id} (Submission: ${job.data.submissionId})`);
  }

  @OnWorkerEvent('progress')
  onProgress(job: Job, progress: number) {
    this.logger.debug(`Progreso del job ${job.id}: ${progress}%`);
  }
}
