import { TestCaseRepositoryPort } from 'src/domain/test-cases/test-case.repository.port';
import { TestCase } from 'src/domain/test-cases/test-case.entity';

export class ListTestCaseUseCase {
  constructor(private readonly testCaseRepo: TestCaseRepositoryPort) {}

  async execute(challengeId?: string): Promise<TestCase[]> {
    if (challengeId) {
      return this.testCaseRepo.findByChallengeId(challengeId);
    }
    return this.testCaseRepo.findAll();
  }
}

