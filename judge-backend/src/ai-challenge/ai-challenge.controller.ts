// ai-challenge.controller.ts
import { Controller, Get, Query, Body, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery, ApiResponse, ApiBody } from '@nestjs/swagger';
import { AiChallengeService } from './ai-challenge.service';

class ChallengeDto {
  title: string;
  description: string;
  difficulty: string;
  tags: string[];
  timeLimit: number;
  memoryLimit: number;
}

class TestCaseDto {
  input: string;
  output: string;
  isHidden: boolean;
}

@ApiTags('AI Challenge Generator')
@Controller('ai-challenge')
export class AiChallengeController {
  constructor(private readonly aiChallengeService: AiChallengeService) {}

  @Get('challenge-idea')
  @ApiOperation({ 
    summary: 'Generar idea de reto de programación',
    description: 'Genera una idea de reto basada en una categoría proporcionada'
  })
  @ApiQuery({ 
    name: 'category', 
    type: String, 
    description: 'Categoría del reto (ej: Árboles binarios, Búsqueda binaria)',
    example: 'Árboles binarios'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Idea de reto generada exitosamente',
    type: ChallengeDto
  })
  async getChallengeIdea(@Query('category') category: string) {
    if (!category) {
      return { error: 'La categoría es requerida' };
    }
    
    return await this.aiChallengeService.generateChallengeIdea(category);
  }

  @Post('test-cases')
  @ApiOperation({ 
    summary: 'Generar casos de prueba para un reto',
    description: 'Genera casos de prueba basados en un reto proporcionado en formato JSON'
  })
  @ApiBody({
    description: 'Challenge en formato JSON',
    schema: {
      type: 'object',
      properties: {
        title: { type: 'string', example: 'Two Sum' },
        description: { type: 'string', example: 'Dado un arreglo de enteros...' },
        difficulty: { type: 'string', example: 'EASY' },
        tags: { type: 'array', items: { type: 'string' }, example: ['arrays', 'hashmap'] },
        timeLimit: { type: 'number', example: 1500 },
        memoryLimit: { type: 'number', example: 256 }
      }
    }
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Casos de prueba generados exitosamente',
    type: [TestCaseDto]
  })
  async getTestCases(@Body() challenge: any) {
    if (!challenge) {
      return { error: 'El challenge es requerido' };
    }
    
    return await this.aiChallengeService.generateTestCases(challenge);
  }
}