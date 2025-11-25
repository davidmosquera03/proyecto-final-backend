import { CourseRepositoryPort } from 'src/domain/courses/course.repository.port';
import { Course } from 'src/domain/courses/course.entity';

export class GetCourseUseCase {
  constructor(private readonly courseRepo: CourseRepositoryPort) {}

  async execute(id: string): Promise<Course | null> {
    return this.courseRepo.findById(id);
  }
}

