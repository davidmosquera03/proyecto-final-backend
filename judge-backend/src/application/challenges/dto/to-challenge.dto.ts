import { Challenge } from "src/domain/challenges/challenge.entity";
export function toChallengeDto(challenge: Challenge) {
  return {
    id: challenge.id,
    title: challenge.title,
    description: challenge.description,
    difficulty: challenge.difficulty,
    tags: challenge.tags,
    timeLimit: challenge.timeLimit,
    memoryLimit: challenge.memoryLimit,
    status: challenge.status,
    courseId: challenge.courseId,
    createdAt: challenge.createdAt,
    updatedAt: challenge.updatedAt
  };
}