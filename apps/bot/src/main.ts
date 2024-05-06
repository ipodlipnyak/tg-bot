import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

const RABBITMQ_URL = process.env?.RABBITMQ_URL || 'amqp://localhost:5672';
const QUEUE = process.env?.RABBITMQ_QUEUE || 'tgQueue';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: [ RABBITMQ_URL ],
      queue: QUEUE,
      queueOptions: {
        durable: false
      },
    },
  });

  await app.listen();``
}
bootstrap();
