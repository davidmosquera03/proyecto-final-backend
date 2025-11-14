import { CourseRepositoryPort } from 'src/domain/courses/course.repository.port';
import { Course } from 'src/domain/courses/course.entity';

export class ListCourseUseCase {
  constructor(private readonly courseRepo: CourseRepositoryPort) {}

  async execute(): Promise<Course[]> {
    return this.courseRepo.findAll();
  }
}

