import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  try {
    await NestFactory.createApplicationContext(AppModule);
    console.log('Worker ejecutándose y escuchando colas...');
  } catch (error) {
    console.error('Error iniciando el worker:', error);
    process.exit(1);
  }
}

void bootstrap();
