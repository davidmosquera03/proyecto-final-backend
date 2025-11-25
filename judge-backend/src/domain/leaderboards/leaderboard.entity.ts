export class Leaderboard {
  constructor(
    public readonly id: string,
    public userId: string,
    public challengeId: string | null, // Null para leaderboard global
    public score: number,
    public submissions: number,
    public lastSubmit: Date | null,
    public createdAt: Date,
    public updatedAt: Date
  ) {}
}


