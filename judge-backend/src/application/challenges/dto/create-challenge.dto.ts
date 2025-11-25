import { IsString, IsEnum, IsArray, IsInt, Min, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum Difficulty {
  EASY = 'EASY',
  MEDIUM = 'MEDIUM',
  HARD = 'HARD'
}

export class CreateChallengeDto {
  @ApiProperty({ example: 'Two Sum' })
  @IsString()
  @MaxLength(200)
  title: string;

  @ApiProperty({ example: 'Dado un arreglo de enteros y un target...' })
  @IsString()
  description: string;

  @ApiProperty({ enum: Difficulty, example: Difficulty.EASY })
  @IsEnum(Difficulty)
  difficulty: Difficulty;

  @ApiProperty({ example: ['arrays', 'hashmap'] })
  @IsArray()
  @IsString({ each: true })
  tags: string[];

  @ApiProperty({ example: 1500 })
  @IsInt()
  @Min(100)
  timeLimit: number;

  @ApiProperty({ example: 256 })
  @IsInt()
  @Min(16)
  memoryLimit: number;

  @ApiProperty({ example: 'course-uuid' })
  @IsString()
  courseId: string;
}