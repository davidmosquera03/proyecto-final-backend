export class TestCase {
  constructor(
    public readonly id: string,
    public challengeId: string,
    public input: string,
    public output: string,
    public isHidden: boolean, // Si es visible para el estudiante
    public createdAt: Date,
    public updatedAt: Date
  ) {}
}


