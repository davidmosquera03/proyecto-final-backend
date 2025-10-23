import { Controller, Post, Body } from '@nestjs/common';
import { SubmissionService } from './submission.service';

@Controller('submissions')
export class SubmissionController {
  constructor(private readonly submissionService: SubmissionService) {}

  @Post()
  async addSubmission(
    @Body() body: { code: string; language: string; userId?: string },
  ) {
    return this.submissionService.addJob(body);
  }
}
