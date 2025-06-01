import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const logger = new Logger('Bootstrap');

  // Configurar o microserviço RabbitMQ
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [
        configService.get<string>('RABBITMQ_URL') || 'amqp://localhost:5673',
      ],
      queue: 'user_queue',
      queueOptions: {
        durable: true,
      },
      maxConnectionAttempts: 5,
    },
  });

  await app.startAllMicroservices();

  // Iniciar o servidor HTTP em uma porta diferente quando rodar localmente
  const port = process.env.NODE_ENV === 'development' ? 3001 : 3000;
  await app.listen(port);

  logger.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
