import { TestCaseRepositoryPort } from 'src/domain/test-cases/test-case.repository.port';

export class DeleteTestCaseUseCase {
  constructor(private readonly testCaseRepo: TestCaseRepositoryPort) {}

  async execute(id: string): Promise<boolean> {
    return this.testCaseRepo.delete(id);
  }
}

