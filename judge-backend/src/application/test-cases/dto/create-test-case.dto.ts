import { IsString, IsBoolean, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTestCaseDto {
  @ApiProperty({ example: 'challenge-uuid' })
  @IsString()
  challengeId: string;

  @ApiProperty({ example: '5\n1 2 3 4 5' })
  @IsString()
  input: string;

  @ApiProperty({ example: '15' })
  @IsString()
  output: string;

  @ApiProperty({ example: false, required: false })
  @IsOptional()
  @IsBoolean()
  isHidden?: boolean;
}

