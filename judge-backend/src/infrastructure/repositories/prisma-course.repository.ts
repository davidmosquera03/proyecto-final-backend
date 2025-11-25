import { PrismaService } from "../prisma.service";
import { Course } from "src/domain/courses/course.entity";
import { CourseRepositoryPort } from "src/domain/courses/course.repository.port";

export class PrismaCourseRepository implements CourseRepositoryPort {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<Course | null> {
    const found = await this.prisma.course.findUnique({ where: { id } });
    return found
      ? new Course(
          found.id,
          found.name,
          found.description,
          found.code,
          found.createdAt,
          found.updatedAt
        )
      : null;
  }

  async delete(id: string): Promise<boolean> {
    try {
      await this.prisma.course.delete({ where: { id } });
      return true;
    } catch {
      return false;
    }
  }

  async save(course: Course): Promise<Course> {
    const saved = await this.prisma.course.upsert({
      where: { id: course.id },
      update: {
        name: course.name,
        description: course.description,
        code: course.code,
      },
      create: {
        id: course.id,
        name: course.name,
        description: course.description,
        code: course.code,
      },
    });
    return new Course(
      saved.id,
      saved.name,
      saved.description,
      saved.code,
      saved.createdAt,
      saved.updatedAt
    );
  }

  async findAll(): Promise<Course[]> {
    const rows = await this.prisma.course.findMany();
    return rows.map(
      (r) =>
        new Course(
          r.id,
          r.name,
          r.description,
          r.code,
          r.createdAt,
          r.updatedAt
        )
    );
  }

  async existsByCode(code: string): Promise<boolean> {
    const count = await this.prisma.course.count({ where: { code } });
    return count > 0;
  }

  async update(
    id: string,
    courseData: Partial<Course>
  ): Promise<Course | null> {
    try {
      const updated = await this.prisma.course.update({
        where: { id },
        data: courseData,
      });
      return new Course(
        updated.id,
        updated.name,
        updated.description,
        updated.code,
        updated.createdAt,
        updated.updatedAt
      );
    } catch {
      return null;
    }
  }
}

