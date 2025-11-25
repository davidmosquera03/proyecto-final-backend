import { CourseRepositoryPort } from 'src/domain/courses/course.repository.port';

export class DeleteCourseUseCase {
  constructor(private readonly courseRepo: CourseRepositoryPort) {}

  async execute(id: string): Promise<boolean> {
    return this.courseRepo.delete(id);
  }
}

