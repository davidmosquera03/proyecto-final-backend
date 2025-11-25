import { NestFactory } from '@nestjs/core';
import { WorkerModule } from './worker.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('WorkerBootstrap');
  
  try {
    const app = await NestFactory.createApplicationContext(WorkerModule, {
      logger: ['error', 'warn', 'log', 'debug', 'verbose'],
    });
    
    logger.log('Worker iniciado correctamente y escuchando colas...');
    logger.log('Colas activas: submissions');
    
    process.on('SIGTERM', async () => {
      logger.log('Recibida señal SIGTERM, cerrando worker...');
      await app.close();
      process.exit(0);
    });

    process.on('SIGINT', async () => {
      logger.log('Recibida señal SIGINT, cerrando worker...');
      await app.close();
      process.exit(0);
    });
  } catch (error) {
    logger.error('Error iniciando el worker:', error);
    process.exit(1);
  }
}

void bootstrap();

