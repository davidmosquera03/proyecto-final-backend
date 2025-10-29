import { Injectable, Logger } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { PrismaService } from '../infrastructure/prisma.service';
import { Language } from './submission.entity';

interface CreateSubmissionDto {
  code: string;
  language: Language;
  userId: string;
  challengeId: string;
}

@Injectable()
export class SubmissionService {
  private readonly logger = new Logger(SubmissionService.name);

  constructor(
    @InjectQueue('submissions') private queue: Queue,
    private readonly prisma: PrismaService,
  ) {}

  async addJob(data: CreateSubmissionDto) {
    try {
      const submission = await this.prisma.submission.create({
        data: {
          code: data.code,
          language: data.language,
          userId: data.userId,
          challengeId: data.challengeId,
          status: 'PENDING',
          score: 0,
          testsPassed: 0,
          testsTotal: 0,
        },
      });

      this.logger.log(`Submission creada: ${submission.id}`);

      const job = await this.queue.add('submission-job', {
        submissionId: submission.id,
        code: data.code,
        language: data.language,
        userId: data.userId,
        challengeId: data.challengeId,
      });

      this.logger.log(`Job agregado a la cola: ${job.id} para submission ${submission.id}`);

      return {
        message: 'Submission creada y agregada a la cola',
        submissionId: submission.id,
        jobId: job.id,
      };
    } catch (error) {
      this.logger.error('Error creando submission o agregando job:', error);
      throw error;
    }
  }

  async getSubmission(submissionId: string) {
    return this.prisma.submission.findUnique({
      where: { id: submissionId },
      include: {
        user: {
          select: {
            id: true,
            email: true,
          },
        },
        challenge: {
          select: {
            id: true,
            title: true,
            difficulty: true,
          },
        },
      },
    });
  }

  async getSubmissionsByUser(userId: string) {
    return this.prisma.submission.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      include: {
        challenge: {
          select: {
            id: true,
            title: true,
            difficulty: true,
          },
        },
      },
    });
  }
}
