import { Challenge } from "src/domain/challenges/challenge.entity";
import { ChallengeRepositoryPort } from "src/domain/challenges/challenge.repository.port";

export class GetChallengeUseCase{
    constructor(private readonly challengeRepo: ChallengeRepositoryPort) {}

    async execute(id: string): Promise<Challenge | null> {
    return this.challengeRepo.findById(id);
  }
}