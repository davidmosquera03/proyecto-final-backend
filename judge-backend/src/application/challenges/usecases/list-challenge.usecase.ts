import { Challenge } from "src/domain/challenges/challenge.entity";
import { ChallengeRepositoryPort } from "src/domain/challenges/challenge.repository.port";

export class ListChallengeUseCase{
    constructor(private readonly challengeRepo: ChallengeRepositoryPort) {}

    async execute(): Promise<Challenge[]> {
    return this.challengeRepo.findAll();
  }
}