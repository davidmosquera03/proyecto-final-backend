// ai-challenge.service.ts
import { Injectable } from '@nestjs/common';
import { GoogleGenAI } from '@google/genai';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AiChallengeService {
  private ai: GoogleGenAI;
  private model = 'gemini-2.5-flash';
  
  constructor(private configService: ConfigService) {
    this.ai = new GoogleGenAI({
      apiKey: this.configService.get<string>('GEMINI_API_KEY'),
    });
  }

  private getConfig() {
    return {
      thinkingConfig: {
        thinkingBudget: -1,
      },
      responseMimeType: 'text/plain',
      systemInstruction: [
        {
          text: `Eres un asistente de IA diseñado que hace solo estas dos cosas
ACCION 1:
genera ideas de Retos de Programacion (tipo maratón)
INPUT: categoría (ejemplo: "Árboles binarios", "Búsqueda binaria", "Algoritmos de ordenamiento")
OUTPUT: una idea de reto en formato JSON de este estilo
{
"title": "Two Sum",
"description": "Dado un arreglo de enteros y un target...",
"difficulty": "EASY",
"tags": ["arrays", "hashmap"],
"timeLimit": 1500,
"memoryLimit": 256
}
ACCION 2: Generar Casos de Uso para un Challenge
INPUT: un challenge en formato JSON
OUTPUT: casos de prueba en formato JSON array
[
{
"input": "15\\n27",
"output": "42",
"isHidden": false
}
]`,
        },
      ],
    };
  }

  async generateChallengeIdea(category: string): Promise<any> {
    const config = this.getConfig();
    const contents = [
      {
        role: 'user',
        parts: [
          {
            text: `ACCION 1: Genera una idea de reto de programación para la categoría: ${category}`,
          },
        ],
      },
    ];

    const response = await this.ai.models.generateContentStream({
      model: this.model,
      config,
      contents,
    });

    let fullText = '';
    for await (const chunk of response) {
      fullText += chunk.text;
    }

    // Extract JSON from response
    const jsonMatch = fullText.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    
    throw new Error('No se pudo extraer JSON de la respuesta');
  }

  async generateTestCases(challenge: any): Promise<any> {
    const config = this.getConfig();
    const contents = [
      {
        role: 'user',
        parts: [
          {
            text: `ACCION 2: Genera casos de prueba para este challenge: ${JSON.stringify(challenge)}`,
          },
        ],
      },
    ];

    const response = await this.ai.models.generateContentStream({
      model: this.model,
      config,
      contents,
    });

    let fullText = '';
    for await (const chunk of response) {
      fullText += chunk.text;
    }

    // Extract JSON array from response
    const jsonMatch = fullText.match(/\[[\s\S]*\]/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    
    throw new Error('No se pudieron extraer casos de prueba de la respuesta');
  }
}