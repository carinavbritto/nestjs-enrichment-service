import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { UserService } from '../services/user.service';
import { CreateUserDto } from '../dto/create-user.dto';

@Controller()
export class UserConsumer {
  constructor(private readonly userService: UserService) {}

  @EventPattern('user.created')
  async handleUserCreated(@Payload() data: CreateUserDto) {
    await this.userService.createEnrichedUser(data);
  }
}
