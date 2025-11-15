import { CourseRepositoryPort } from 'src/domain/courses/course.repository.port';
import { CreateCourseDto } from '../dto/create-course.dto';
import { Course } from 'src/domain/courses/course.entity';
import { randomUUID } from 'crypto';
import { ConflictException } from '@nestjs/common';

export class CreateCourseUseCase {
  constructor(private readonly courseRepo: CourseRepositoryPort) {}

  async execute(input: CreateCourseDto): Promise<Course> {
    const codeTaken = await this.courseRepo.existsByCode(input.code);
    if (codeTaken) {
      throw new ConflictException('Course code already in use');
    }
    const course = new Course(
      randomUUID(),
      input.name,
      input.description || null,
      input.code,
      new Date(),
      new Date()
    );
    return this.courseRepo.save(course);
  }
}

