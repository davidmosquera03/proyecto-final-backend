import { ChallengeRepositoryPort } from "src/domain/challenges/challenge.repository.port";
import { UpdateChallengeDto } from "../dto/update-challenge.dto";
import { Challenge } from "src/domain/challenges/challenge.entity";

export class UpdateChallengeUsecase{
    constructor(private readonly challengeRepo: ChallengeRepositoryPort) {}

    async execute(id: string, dto: UpdateChallengeDto): Promise<Challenge | null> {
    return this.challengeRepo.update(id, dto);
  }
}