export class ChallengeDto {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  tags: string[];
  timeLimit: number;
  memoryLimit: number;
  status: string;
  courseId: string;
  createdAt: Date;
  updatedAt: Date;
}