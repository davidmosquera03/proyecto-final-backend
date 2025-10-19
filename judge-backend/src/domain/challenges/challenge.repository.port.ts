import { Challenge } from "./challenge.entity";


export interface ChallengeRepositoryPort {
  save(challenge: Challenge): Promise<Challenge>;
  findById(id: string): Promise<Challenge | null>;
  findAll(): Promise<Challenge[]>;
  existsByTitle(title: string): Promise<boolean>;
  update(id: string, challenge: Partial<Challenge>): Promise<Challenge | null>;
  delete(id: string): Promise<boolean>;
}
