import { TEST_CASE_REPOSITORY } from 'src/application/test-cases/tokens';
import { CreateTestCaseUseCase } from 'src/application/test-cases/usecases/create-test-case.usecase';
import { DeleteTestCaseUseCase } from 'src/application/test-cases/usecases/delete-test-case.usecase';
import { GetTestCaseUseCase } from 'src/application/test-cases/usecases/get-test-case.usecase';
import { ListTestCaseUseCase } from 'src/application/test-cases/usecases/list-test-case.usecase';
import { UpdateTestCaseUseCase } from 'src/application/test-cases/usecases/update-test-case.usecase';
import { PrismaService } from 'src/infrastructure/prisma.service';
import { PrismaTestCaseRepository } from 'src/infrastructure/repositories/prisma-test-case.repository';
import { TestCasesController } from './test-cases.controller';
import { Module } from '@nestjs/common';
import { UsersModule } from 'src/presentation/users/users.module';

const usePrisma = !!process.env.DATABASE_URL;

@Module({
  imports: [UsersModule],
  controllers: [TestCasesController],
  providers: [
    ...(usePrisma ? [PrismaService] : []),
    {
      provide: TEST_CASE_REPOSITORY,
      useFactory: (prisma: PrismaService) =>
        new PrismaTestCaseRepository(prisma),
      inject: usePrisma ? [PrismaService] : [],
    },
    {
      provide: CreateTestCaseUseCase,
      useFactory: (repo: any) => new CreateTestCaseUseCase(repo),
      inject: [TEST_CASE_REPOSITORY],
    },
    {
      provide: GetTestCaseUseCase,
      useFactory: (repo: any) => new GetTestCaseUseCase(repo),
      inject: [TEST_CASE_REPOSITORY],
    },
    {
      provide: ListTestCaseUseCase,
      useFactory: (repo: any) => new ListTestCaseUseCase(repo),
      inject: [TEST_CASE_REPOSITORY],
    },
    {
      provide: UpdateTestCaseUseCase,
      useFactory: (repo: any) => new UpdateTestCaseUseCase(repo),
      inject: [TEST_CASE_REPOSITORY],
    },
    {
      provide: DeleteTestCaseUseCase,
      useFactory: (repo: any) => new DeleteTestCaseUseCase(repo),
      inject: [TEST_CASE_REPOSITORY],
    },
  ],
})
export class TestCasesHttpModule {}

