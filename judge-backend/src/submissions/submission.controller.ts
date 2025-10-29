import { Controller, Post, Get, Body, Param, Query } from '@nestjs/common';
import { SubmissionService } from './submission.service';
import { Language } from './submission.entity';

@Controller('submissions')
export class SubmissionController {
  constructor(private readonly submissionService: SubmissionService) {}

  @Post()
  async addSubmission(
    @Body()
    body: {
      code: string;
      language: Language;
      userId: string;
      challengeId: string;
    },
  ) {
    return this.submissionService.addJob(body);
  }

  @Get(':id')
  async getSubmission(@Param('id') id: string) {
    return this.submissionService.getSubmission(id);
  }

  @Get()
  async getSubmissions(@Query('userId') userId?: string) {
    if (userId) {
      return this.submissionService.getSubmissionsByUser(userId);
    }
    return { message: 'Proporciona userId como query parameter' };
  }
}
