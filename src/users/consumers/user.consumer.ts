import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { UserService } from '../services/user.service';
import { Logger } from '@nestjs/common';

interface UserCreatedEvent {
  uuid: string;
  name: string;
}

@Controller()
export class UserConsumer {
  private readonly logger = new Logger(UserConsumer.name);

  constructor(private readonly userService: UserService) {}

  @EventPattern('user.created')
  async handleUserCreated(@Payload() data: UserCreatedEvent) {
    try {
      this.logger.log(`Received event with data: ${JSON.stringify(data)}`);

      // Verifica se os dados necessários estão presentes
      if (!data.uuid || !data.name) {
        this.logger.error('Missing required fields in event data');
        return;
      }

      // Normalizar o nome do usuário para URLs
      const normalizedName = this.normalizeName(data.name);

      // Gerar dados sociais fictícios
      const socialData = {
        linkedin: `https://linkedin.com/in/${normalizedName}`,
        github: `https://github.com/${normalizedName}`,
      };

      // Persistir os dados enriquecidos
      await this.userService.create({
        uuid: data.uuid,
        name: data.name,
        ...socialData,
      });

      this.logger.log(`Successfully processed user ${data.uuid}`);
    } catch (error) {
      this.logger.error(
        `Error processing user ${data.uuid}: ${error.message}`,
        error.stack,
      );
      // O RabbitMQ vai automaticamente retry a mensagem
      // Se falhar após todas as tentativas, a mensagem vai para a dead-letter queue
      throw error;
    }
  }

  private normalizeName(name: string): string {
    return name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Remove acentos
      .replace(/[^a-z0-9]/g, '-') // Substitui caracteres especiais por hífen
      .replace(/-+/g, '-') // Remove hífens duplicados
      .replace(/^-|-$/g, ''); // Remove hífens do início e fim
  }
}
