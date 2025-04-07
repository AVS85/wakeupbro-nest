import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

async function bootstrap() {
  // Загружаем переменные окружения из .env файла
  dotenv.config();

  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 7001);
}
bootstrap();
