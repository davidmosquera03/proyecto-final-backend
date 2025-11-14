import { Course } from 'src/domain/courses/course.entity';
import { CourseDto } from './course.dto';

export function toCourseDto(course: Course): CourseDto {
  return {
    id: course.id,
    name: course.name,
    description: course.description,
    code: course.code,
    createdAt: course.createdAt,
    updatedAt: course.updatedAt,
  };
}

