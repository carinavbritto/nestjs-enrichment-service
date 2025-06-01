import { Controller, Get, Param, Logger } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { User } from '../schemas/user.schema';

@Controller('users')
export class UserController {
  private readonly logger = new Logger(UserController.name);

  constructor(private readonly userService: UserService) {}

  @Get('enriched/:uuid')
  async getEnrichedUser(@Param('uuid') uuid: string): Promise<Partial<User>> {
    try {
      this.logger.log(`Fetching enriched data for user ${uuid}`);
      const user = await this.userService.findByUuid(uuid);
      this.logger.log(`Found user ${uuid} with data: ${JSON.stringify(user)}`);
      return {
        linkedin: user.linkedin,
        github: user.github,
      };
    } catch (error) {
      this.logger.error(
        `Error fetching user ${uuid}: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }
}
