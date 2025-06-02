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
        configService.get<string>('RABBITMQ_URL') ||
          'amqp://user-service-rabbitmq:5672',
      ],
      queue: 'user_events',
      queueOptions: {
        durable: true,
      },
      maxConnectionAttempts: 5,
      prefetchCount: 1,
      isGlobalPrefetchCount: true,
      noAck: false,
      persistent: true,
    },
  });

  await app.startAllMicroservices();

  // Configurar o servidor HTTP
  const port = 3000;
  const host = '0.0.0.0';

  // Habilitar CORS
  app.enableCors();

  // Configurar o servidor para escutar em todas as interfaces
  await app.listen(port, host);
  logger.log(`Application is running on: http://${host}:${port}`);
}
bootstrap();
