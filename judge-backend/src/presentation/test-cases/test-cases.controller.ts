import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  UseGuards,
  Put,
  Delete,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateTestCaseDto } from 'src/application/test-cases/dto/create-test-case.dto';
import { toTestCaseDto } from 'src/application/test-cases/dto/to-test-case.dto';
import { UpdateTestCaseDto } from 'src/application/test-cases/dto/update-test-case.dto';
import { CreateTestCaseUseCase } from 'src/application/test-cases/usecases/create-test-case.usecase';
import { DeleteTestCaseUseCase } from 'src/application/test-cases/usecases/delete-test-case.usecase';
import { GetTestCaseUseCase } from 'src/application/test-cases/usecases/get-test-case.usecase';
import { ListTestCaseUseCase } from 'src/application/test-cases/usecases/list-test-case.usecase';
import { UpdateTestCaseUseCase } from 'src/application/test-cases/usecases/update-test-case.usecase';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { AdminGuard } from '../guards/role.guard';

@ApiTags('test-cases')
@Controller('test-cases')
export class TestCasesController {
  constructor(
    private readonly createTestCase: CreateTestCaseUseCase,
    private readonly getTestCase: GetTestCaseUseCase,
    private readonly listTestCases: ListTestCaseUseCase,
    private readonly updateTestCase: UpdateTestCaseUseCase,
    private readonly deleteTestCase: DeleteTestCaseUseCase
  ) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, AdminGuard)
  async create(@Body() body: CreateTestCaseDto) {
    const testCase = await this.createTestCase.execute(body);
    return toTestCaseDto(testCase);
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async get(@Param('id') id: string) {
    const testCase = await this.getTestCase.execute(id);
    if (!testCase) return { message: 'TestCase not found' };
    return toTestCaseDto(testCase);
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async list(@Query('challengeId') challengeId?: string) {
    const testCases = await this.listTestCases.execute(challengeId);
    return testCases.map(toTestCaseDto);
  }

  @Put(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, AdminGuard)
  async update(@Param('id') id: string, @Body() body: UpdateTestCaseDto) {
    const testCase = await this.updateTestCase.execute(id, body);
    if (!testCase) return { message: 'TestCase not found' };
    return toTestCaseDto(testCase);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, AdminGuard)
  async delete(@Param('id') id: string) {
    const deleted = await this.deleteTestCase.execute(id);
    return { success: deleted, message: deleted ? 'Deleted' : 'Not found' };
  }
}

