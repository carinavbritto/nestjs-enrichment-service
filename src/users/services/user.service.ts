import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { User } from '../schemas/user.schema';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(userData: Partial<User>): Promise<User> {
    return this.userRepository.create(userData);
  }

  async findByUuid(uuid: string): Promise<User> {
    const user = await this.userRepository.findByUuid(uuid);
    if (!user) {
      throw new NotFoundException(`User with UUID ${uuid} not found`);
    }
    return user;
  }
}
