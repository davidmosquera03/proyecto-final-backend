import { CHALLENGE_REPOSITORY } from "src/application/challenges/tokens";
import { CreateChallengeUseCase } from "src/application/challenges/usecases/create-challenge.usecase";
import { DeleteChallengeUseCase } from "src/application/challenges/usecases/delete-challenge.usecase";
import { GetChallengeUseCase } from "src/application/challenges/usecases/get-challenge.usecase";
import { ListChallengeUseCase } from "src/application/challenges/usecases/list-challenge.usecase";
import { UpdateChallengeUsecase } from 'src/application/challenges/usecases/update.challenge.usecase';
import { PrismaService } from "src/infrastructure/prisma.service";
import { PrismaChallengeRepository } from "src/infrastructure/repositories/prisma-challenge.repository";
import { ChallengesController } from "./challenges.controller";
import { Module } from '@nestjs/common';
import { UsersModule } from 'src/presentation/users/users.module';
const usePrisma = !!process.env.DATABASE_URL;

@Module({
  imports: [UsersModule],
  controllers: [ChallengesController],
  providers: [
    ...(usePrisma ? [PrismaService] : []),
    {
      provide: CHALLENGE_REPOSITORY,
      useFactory: (prisma: PrismaService) => new PrismaChallengeRepository(prisma),
      inject: usePrisma ? [PrismaService] : [],
    },
    {
      provide: CreateChallengeUseCase,
      useFactory: (repo: any) => new CreateChallengeUseCase(repo),
      inject: [CHALLENGE_REPOSITORY],
    },
    {
      provide: GetChallengeUseCase,
      useFactory: (repo: any) => new GetChallengeUseCase(repo),
      inject: [CHALLENGE_REPOSITORY],
    },
    {
      provide: ListChallengeUseCase,
      useFactory: (repo: any) => new ListChallengeUseCase(repo),
      inject: [CHALLENGE_REPOSITORY],
    },
    
    {
      provide: UpdateChallengeUsecase,
      useFactory: (repo: any) => new UpdateChallengeUsecase(repo),
      inject: [CHALLENGE_REPOSITORY],
    },
    {
      provide: DeleteChallengeUseCase,
      useFactory: (repo: any) => new DeleteChallengeUseCase(repo),
      inject: [CHALLENGE_REPOSITORY],
    },
  ],
})
export class ChallengesHttpModule {}