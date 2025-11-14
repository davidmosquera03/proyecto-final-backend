import { TestCaseRepositoryPort } from 'src/domain/test-cases/test-case.repository.port';
import { UpdateTestCaseDto } from '../dto/update-test-case.dto';
import { TestCase } from 'src/domain/test-cases/test-case.entity';

export class UpdateTestCaseUseCase {
  constructor(private readonly testCaseRepo: TestCaseRepositoryPort) {}

  async execute(
    id: string,
    input: UpdateTestCaseDto
  ): Promise<TestCase | null> {
    return this.testCaseRepo.update(id, input);
  }
}

