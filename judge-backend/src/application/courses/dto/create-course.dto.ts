import { IsString, IsOptional, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCourseDto {
  @ApiProperty({ example: 'Algoritmos y Estructuras de Datos' })
  @IsString()
  @MaxLength(200)
  name: string;

  @ApiProperty({ example: 'Curso introductorio de algoritmos', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: 'CS101' })
  @IsString()
  @MaxLength(50)
  code: string;
}

