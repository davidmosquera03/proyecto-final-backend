import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  UseGuards,
  Put,
  Delete,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateCourseDto } from 'src/application/courses/dto/create-course.dto';
import { toCourseDto } from 'src/application/courses/dto/to-course.dto';
import { UpdateCourseDto } from 'src/application/courses/dto/update-course.dto';
import { CreateCourseUseCase } from 'src/application/courses/usecases/create-course.usecase';
import { DeleteCourseUseCase } from 'src/application/courses/usecases/delete-course.usecase';
import { GetCourseUseCase } from 'src/application/courses/usecases/get-course.usecase';
import { ListCourseUseCase } from 'src/application/courses/usecases/list-course.usecase';
import { UpdateCourseUseCase } from 'src/application/courses/usecases/update-course.usecase';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { AdminGuard } from '../guards/role.guard';

@ApiTags('courses')
@Controller('courses')
export class CoursesController {
  constructor(
    private readonly createCourse: CreateCourseUseCase,
    private readonly getCourse: GetCourseUseCase,
    private readonly listCourses: ListCourseUseCase,
    private readonly updateCourse: UpdateCourseUseCase,
    private readonly deleteCourse: DeleteCourseUseCase
  ) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, AdminGuard)
  async create(@Body() body: CreateCourseDto) {
    const course = await this.createCourse.execute(body);
    return toCourseDto(course);
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async get(@Param('id') id: string) {
    const course = await this.getCourse.execute(id);
    if (!course) return { message: 'Course not found' };
    return toCourseDto(course);
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async list() {
    const courses = await this.listCourses.execute();
    return courses.map(toCourseDto);
  }

  @Put(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, AdminGuard)
  async update(@Param('id') id: string, @Body() body: UpdateCourseDto) {
    const course = await this.updateCourse.execute(id, body);
    if (!course) return { message: 'Course not found' };
    return toCourseDto(course);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, AdminGuard)
  async delete(@Param('id') id: string) {
    const deleted = await this.deleteCourse.execute(id);
    return { success: deleted, message: deleted ? 'Deleted' : 'Not found' };
  }
}

