import { ChallengeRepositoryPort } from "src/domain/challenges/challenge.repository.port";

export class DeleteChallengeUseCase{
    constructor(private readonly challengeRepo: ChallengeRepositoryPort) {}

  async execute(id: string): Promise<boolean> {
    return this.challengeRepo.delete(id);
  }
}