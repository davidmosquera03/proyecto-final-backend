import { TestCase } from "./test-case.entity";

export interface TestCaseRepositoryPort {
  save(testCase: TestCase): Promise<TestCase>;
  findById(id: string): Promise<TestCase | null>;
  findByChallengeId(challengeId: string): Promise<TestCase[]>;
  findAll(): Promise<TestCase[]>;
  update(id: string, testCase: Partial<TestCase>): Promise<TestCase | null>;
  delete(id: string): Promise<boolean>;
}

