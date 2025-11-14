import { TestCase } from 'src/domain/test-cases/test-case.entity';
import { TestCaseDto } from './test-case.dto';

export function toTestCaseDto(testCase: TestCase): TestCaseDto {
  return {
    id: testCase.id,
    challengeId: testCase.challengeId,
    input: testCase.input,
    output: testCase.output,
    isHidden: testCase.isHidden,
    createdAt: testCase.createdAt,
    updatedAt: testCase.updatedAt,
  };
}

