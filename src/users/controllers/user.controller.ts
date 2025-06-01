import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { User } from '../schemas/user.schema';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('enriched/:uuid')
  async getEnrichedUser(@Param('uuid') uuid: string): Promise<Partial<User>> {
    const user = await this.userService.findByUuid(uuid);
    return {
      linkedin: user.linkedin,
      github: user.github,
    };
  }
}
