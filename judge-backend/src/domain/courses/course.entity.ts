export class Course {
  constructor(
    public readonly id: string,
    public name: string,
    public description: string | null,
    public code: string,
    public createdAt: Date,
    public updatedAt: Date
  ) {}
}

