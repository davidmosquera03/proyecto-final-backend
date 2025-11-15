import { COURSE_REPOSITORY } from 'src/application/courses/tokens';
import { CreateCourseUseCase } from 'src/application/courses/usecases/create-course.usecase';
import { DeleteCourseUseCase } from 'src/application/courses/usecases/delete-course.usecase';
import { GetCourseUseCase } from 'src/application/courses/usecases/get-course.usecase';
import { ListCourseUseCase } from 'src/application/courses/usecases/list-course.usecase';
import { UpdateCourseUseCase } from 'src/application/courses/usecases/update-course.usecase';
import { PrismaService } from 'src/infrastructure/prisma.service';
import { PrismaCourseRepository } from 'src/infrastructure/repositories/prisma-course.repository';
import { CoursesController } from './courses.controller';
import { Module } from '@nestjs/common';
import { UsersModule } from 'src/presentation/users/users.module';

const usePrisma = !!process.env.DATABASE_URL;

@Module({
  imports: [UsersModule],
  controllers: [CoursesController],
  providers: [
    ...(usePrisma ? [PrismaService] : []),
    {
      provide: COURSE_REPOSITORY,
      useFactory: (prisma: PrismaService) => new PrismaCourseRepository(prisma),
      inject: usePrisma ? [PrismaService] : [],
    },
    {
      provide: CreateCourseUseCase,
      useFactory: (repo: any) => new CreateCourseUseCase(repo),
      inject: [COURSE_REPOSITORY],
    },
    {
      provide: GetCourseUseCase,
      useFactory: (repo: any) => new GetCourseUseCase(repo),
      inject: [COURSE_REPOSITORY],
    },
    {
      provide: ListCourseUseCase,
      useFactory: (repo: any) => new ListCourseUseCase(repo),
      inject: [COURSE_REPOSITORY],
    },
    {
      provide: UpdateCourseUseCase,
      useFactory: (repo: any) => new UpdateCourseUseCase(repo),
      inject: [COURSE_REPOSITORY],
    },
    {
      provide: DeleteCourseUseCase,
      useFactory: (repo: any) => new DeleteCourseUseCase(repo),
      inject: [COURSE_REPOSITORY],
    },
  ],
})
export class CoursesHttpModule {}

