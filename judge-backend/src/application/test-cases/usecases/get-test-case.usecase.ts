import { TestCaseRepositoryPort } from 'src/domain/test-cases/test-case.repository.port';
import { TestCase } from 'src/domain/test-cases/test-case.entity';

export class GetTestCaseUseCase {
  constructor(private readonly testCaseRepo: TestCaseRepositoryPort) {}

  async execute(id: string): Promise<TestCase | null> {
    return this.testCaseRepo.findById(id);
  }
}

