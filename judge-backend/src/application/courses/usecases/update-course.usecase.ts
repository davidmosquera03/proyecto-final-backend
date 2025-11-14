import { CourseRepositoryPort } from 'src/domain/courses/course.repository.port';
import { UpdateCourseDto } from '../dto/update-course.dto';
import { Course } from 'src/domain/courses/course.entity';
import { ConflictException } from '@nestjs/common';

export class UpdateCourseUseCase {
  constructor(private readonly courseRepo: CourseRepositoryPort) {}

  async execute(id: string, input: UpdateCourseDto): Promise<Course | null> {
    if (input.code) {
      const existing = await this.courseRepo.findById(id);
      if (!existing) {
        return null;
      }
      // Check if code is taken by another course
      const codeTaken = await this.courseRepo.existsByCode(input.code);
      if (codeTaken && existing.code !== input.code) {
        throw new ConflictException('Course code already in use');
      }
    }
    return this.courseRepo.update(id, input);
  }
}

