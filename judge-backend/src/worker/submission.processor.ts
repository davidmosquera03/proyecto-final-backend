import { Processor, WorkerHost, OnWorkerEvent } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../infrastructure/prisma.service';
import { SubmissionStatus, Language } from '../domain/submissions/submission.entity';

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

  constructor(private readonly prisma: PrismaService) {
    super();
  }

  async process(job: Job<SubmissionJob>): Promise<{ result: string; submissionId: string }> {
    const { submissionId, code, language, userId, challengeId } = job.data;
    
    this.logger.log(`Procesando submission ${submissionId} (Job ${job.id})...`);

    try {
      await this.prisma.submission.update({
        where: { id: submissionId },
        data: { status: 'RUNNING' },
      });

      await this.simulateCodeExecution(submissionId, challengeId);

      await this.prisma.submission.update({
        where: { id: submissionId },
        data: {
          status: 'ACCEPTED',
          score: 100,
          testsPassed: 1,
          testsTotal: 1,
        },
      });

      this.logger.log(`Submission ${submissionId} procesada exitosamente`);
      return { result: 'OK', submissionId };
    } catch (error) {
      this.logger.error(`Error procesando submission ${submissionId}:`, error);
      
      await this.prisma.submission.update({
        where: { id: submissionId },
        data: {
          status: 'RUNTIME_ERROR',
          errorMessage: error instanceof Error ? error.message : 'Error desconocido',
        },
      }).catch((updateError) => {
        this.logger.error(`Error actualizando submission ${submissionId}:`, updateError);
      });

      throw error;
    }
  }

  private async simulateCodeExecution(submissionId: string, challengeId: string): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 2000));
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
