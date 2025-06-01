import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { User } from '../schemas/user.schema';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(private readonly userRepository: UserRepository) {}

  async create(userData: Partial<User>): Promise<User> {
    try {
      this.logger.log(`Creating user with data: ${JSON.stringify(userData)}`);
      const user = await this.userRepository.create(userData);
      this.logger.log(`User created successfully: ${JSON.stringify(user)}`);
      return user;
    } catch (error) {
      this.logger.error(`Error creating user: ${error.message}`, error.stack);
      throw error;
    }
  }

  async findByUuid(uuid: string): Promise<User> {
    try {
      this.logger.log(`Finding user with UUID: ${uuid}`);
      const user = await this.userRepository.findByUuid(uuid);
      if (!user) {
        this.logger.warn(`User with UUID ${uuid} not found`);
        throw new NotFoundException(`User with UUID ${uuid} not found`);
      }
      this.logger.log(`User found: ${JSON.stringify(user)}`);
      return user;
    } catch (error) {
      this.logger.error(
        `Error finding user ${uuid}: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }
}
