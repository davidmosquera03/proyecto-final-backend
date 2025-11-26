import { Controller, Post, Get, Body, Param, Query } from '@nestjs/common';
import { CreateSubmissionDto, SubmissionService } from './submission.service';
import { Language } from '../domain/submissions/submission.entity';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('submissions')
@Controller('submissions')
export class SubmissionController {
  constructor(private readonly submissionService: SubmissionService) {}

  @Post()
  @ApiBody({ type: CreateSubmissionDto }) // 👈 add this line
  async addSubmission(@Body() body: CreateSubmissionDto) {
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
    return this.submissionService.getAllSubmissions();
  }
}
