import { PrismaService } from "../prisma.service";
import { TestCase } from "src/domain/test-cases/test-case.entity";
import { TestCaseRepositoryPort } from "src/domain/test-cases/test-case.repository.port";

export class PrismaTestCaseRepository implements TestCaseRepositoryPort {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<TestCase | null> {
    const found = await this.prisma.testCase.findUnique({ where: { id } });
    return found
      ? new TestCase(
          found.id,
          found.challengeId,
          found.input,
          found.output,
          found.isHidden,
          found.createdAt,
          found.updatedAt
        )
      : null;
  }

  async findByChallengeId(challengeId: string): Promise<TestCase[]> {
    const rows = await this.prisma.testCase.findMany({
      where: { challengeId },
    });
    return rows.map(
      (r) =>
        new TestCase(
          r.id,
          r.challengeId,
          r.input,
          r.output,
          r.isHidden,
          r.createdAt,
          r.updatedAt
        )
    );
  }

  async delete(id: string): Promise<boolean> {
    try {
      await this.prisma.testCase.delete({ where: { id } });
      return true;
    } catch {
      return false;
    }
  }

  async save(testCase: TestCase): Promise<TestCase> {
    const saved = await this.prisma.testCase.upsert({
      where: { id: testCase.id },
      update: {
        challengeId: testCase.challengeId,
        input: testCase.input,
        output: testCase.output,
        isHidden: testCase.isHidden,
      },
      create: {
        id: testCase.id,
        challengeId: testCase.challengeId,
        input: testCase.input,
        output: testCase.output,
        isHidden: testCase.isHidden,
      },
    });
    return new TestCase(
      saved.id,
      saved.challengeId,
      saved.input,
      saved.output,
      saved.isHidden,
      saved.createdAt,
      saved.updatedAt
    );
  }

  async findAll(): Promise<TestCase[]> {
    const rows = await this.prisma.testCase.findMany();
    return rows.map(
      (r) =>
        new TestCase(
          r.id,
          r.challengeId,
          r.input,
          r.output,
          r.isHidden,
          r.createdAt,
          r.updatedAt
        )
    );
  }

  async update(
    id: string,
    testCaseData: Partial<TestCase>
  ): Promise<TestCase | null> {
    try {
      const updated = await this.prisma.testCase.update({
        where: { id },
        data: testCaseData,
      });
      return new TestCase(
        updated.id,
        updated.challengeId,
        updated.input,
        updated.output,
        updated.isHidden,
        updated.createdAt,
        updated.updatedAt
      );
    } catch {
      return null;
    }
  }
}

