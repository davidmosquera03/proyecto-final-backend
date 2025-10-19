import { PrismaService } from "../prisma.service";
import { Challenge } from "src/domain/challenges/challenge.entity";
import { ChallengeRepositoryPort } from "src/domain/challenges/challenge.repository.port";

export class PrismaChallengeRepository implements ChallengeRepositoryPort {
  constructor(private readonly prisma: PrismaService) {}


    async findById(id: string): Promise<Challenge | null> {
        const found = await this.prisma.challenge.findUnique({ where: { id } });
        return found ? new Challenge( 
            found.id,
            found.title,
            found.description,
            found.difficulty,
            found.tags,
            found.timeLimit,
            found.memoryLimit,
            found.status,
            found.createdAt,
            found.updatedAt
        ) : null;
    }


async delete(id: string): Promise<boolean> {
    try {
        await this.prisma.challenge.delete({ where: { id } });
        return true;
    } catch {
        return false; // User not found
    }
}

 async save(challenge: Challenge): Promise<Challenge> {
    const saved = await this.prisma.challenge.upsert({
      where: { id: challenge.id },
      update: { 
        title: challenge.title,
        description: challenge.description,
        difficulty: challenge.difficulty,
        tags: challenge.tags,
        timeLimit: challenge.timeLimit,
        memoryLimit: challenge.memoryLimit,
        status: challenge.status
      },
      create: { 
        id: challenge.id, 
        title: challenge.title,
        description: challenge.description,
        difficulty: challenge.difficulty,
        tags: challenge.tags,
        timeLimit: challenge.timeLimit,
        memoryLimit: challenge.memoryLimit,
        status: challenge.status
      },
    });
    return new Challenge( 
            saved.id,
            saved.title,
            saved.description,
            saved.difficulty,
            saved.tags,
            saved.timeLimit,
            saved.memoryLimit,
            saved.status,
            saved.createdAt,
            saved.updatedAt
    );
  }

  async findAll(): Promise<Challenge[]> {
    const rows = await this.prisma.challenge.findMany();
    return rows.map(r => new Challenge( 
            r.id,
            r.title,
            r.description,
            r.difficulty,
            r.tags,
            r.timeLimit,
            r.memoryLimit,
            r.status,
            r.createdAt,
            r.updatedAt
    ));
  }

  async existsByTitle(title: string): Promise<boolean> {
    const count = await this.prisma.challenge.count({ where: { title } });
    return count > 0;
  }

  async update(id: string, challengeData: Partial<Challenge>): Promise<Challenge | null> {
  try {
    const updated = await this.prisma.challenge.update({
      where: { id },
      data: challengeData,
    });
    return new Challenge( 
            updated.id,
            updated.title,
            updated.description,
            updated.difficulty,
            updated.tags,
            updated.timeLimit,
            updated.memoryLimit,
            updated.status,
            updated.createdAt,
            updated.updatedAt
    );
  } catch {
    return null; // Challenge not found
  }
}
}