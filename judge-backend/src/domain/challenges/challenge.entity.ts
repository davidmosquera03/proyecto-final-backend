export type Difficulty = 'EASY' | 'MEDIUM' | 'HARD';
export type Status = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';

// domain/entities/Challenge.ts
export class Challenge {
  constructor(
    public readonly id: string,
    public title: string,
    public description: string,
    public difficulty: Difficulty,
    public tags: string[],
    public timeLimit: number,
    public memoryLimit: number,
    public status: Status,
    public createdAt: Date,
    public updatedAt: Date
  ) {}
}


