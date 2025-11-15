import { TestCaseRepositoryPort } from 'src/domain/test-cases/test-case.repository.port';
import { CreateTestCaseDto } from '../dto/create-test-case.dto';
import { TestCase } from 'src/domain/test-cases/test-case.entity';
import { randomUUID } from 'crypto';

export class CreateTestCaseUseCase {
  constructor(private readonly testCaseRepo: TestCaseRepositoryPort) {}

  async execute(input: CreateTestCaseDto): Promise<TestCase> {
    const testCase = new TestCase(
      randomUUID(),
      input.challengeId,
      input.input,
      input.output,
      input.isHidden ?? false,
      new Date(),
      new Date()
    );
    return this.testCaseRepo.save(testCase);
  }
}

