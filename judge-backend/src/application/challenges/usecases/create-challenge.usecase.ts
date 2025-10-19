import { ChallengeRepositoryPort } from "src/domain/challenges/challenge.repository.port";
import { CreateChallengeDto } from "../dto/create-challenge.dto";
import { Challenge } from "src/domain/challenges/challenge.entity";
import { randomUUID } from 'crypto';
import { ConflictException } from '@nestjs/common';
export class CreateChallengeUseCase {
  constructor(private readonly challengeRepo: ChallengeRepositoryPort) {}

  async execute(input: CreateChallengeDto): Promise<Challenge> {
    const titleTaken = await this.challengeRepo.existsByTitle(input.title);
    if (titleTaken) {
      throw new ConflictException('Title already in use');
    }
    const challenge = new Challenge( 
        randomUUID(),
        input.title,
        input.description,
        input.difficulty,
        input.tags,
        input.timeLimit,
        input.memoryLimit,
        'DRAFT',
        new Date(),
        new Date()
        );
    return this.challengeRepo.save(challenge);
  }
}