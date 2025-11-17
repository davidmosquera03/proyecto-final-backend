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
  const { submissionId, code, language, challengeId } = job.data;
  this.logger.log(`Running submission ${submissionId}...`);

  // 1. Marcar como running
  await this.prisma.submission.update({
    where: { id: submissionId },
    data: { status: 'RUNNING' },
  });

  // 2. Obtener challenge + testcases
  const challenge = await this.prisma.challenge.findUnique({
    where: { id: challengeId },
    include: { testCases: true },
  });

  if (!challenge) throw new Error("Challenge not found");

  const timeLimitMs = challenge.timeLimit ?? 2000;
  const testcases = challenge.testCases;

  let passed = 0;
  let total = testcases.length;
  let totalTime = 0;

  // 3. Ejecutar cada testcase
  for (const tc of testcases) {

    const result = await this.runner.runCode(
      language,
      code,
      tc.input,
      timeLimitMs
    );

    // Error del runner
    if (!result.success) {
      if (result.error === "Timeout") {
        await this.prisma.submission.update({
          where: { id: submissionId },
          data: {
            status: 'TIME_LIMIT_EXCEEDED',
            testsPassed: passed,
            testsTotal: total,
            executionTime: totalTime,
          },
        });
        return { result: 'TLE', submissionId };
      }

      // runtime error
      await this.prisma.submission.update({
        where: { id: submissionId },
        data: {
          status: 'RUNTIME_ERROR',
          testsPassed: passed,
          testsTotal: total,
          executionTime: totalTime,
        },
      });
      return { result: 'RE', submissionId };
    }

    // Comparar salida
    const studentOutput = result.output.trim();
    const expectedOutput = tc.output.trim();

    if (studentOutput !== expectedOutput) {
      await this.prisma.submission.update({
        where: { id: submissionId },
        data: {
          status: 'WRONG_ANSWER',
          testsPassed: passed,
          testsTotal: total,
          executionTime: totalTime,
        },
      });

      return { result: 'WA', submissionId };
    }

    // OK
    passed++;
    totalTime += result.timeMs ?? 0;
  }

  // 4. Todos correctos → ACCEPTED
  await this.prisma.submission.update({
    where: { id: submissionId },
    data: {
      status: 'ACCEPTED',
      score: 100,
      testsPassed: passed,
      testsTotal: total,
      executionTime: totalTime,
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
