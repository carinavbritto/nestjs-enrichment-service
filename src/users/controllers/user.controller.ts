import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from '../services/user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('enriched/:uuid')
  async getEnrichedUser(@Param('uuid') uuid: string) {
    return this.userService.findByUuid(uuid);
  }
}
