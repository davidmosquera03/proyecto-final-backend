import { Course } from "./course.entity";

export interface CourseRepositoryPort {
  save(course: Course): Promise<Course>;
  findById(id: string): Promise<Course | null>;
  findAll(): Promise<Course[]>;
  existsByCode(code: string): Promise<boolean>;
  update(id: string, course: Partial<Course>): Promise<Course | null>;
  delete(id: string): Promise<boolean>;
}

