import { RabbitMqProvider } from '@infra/providers/implementations/rabbitMq-provider';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3337, () => console.log('Server started'));
}
bootstrap();
