import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserRepository } from '../repositories/user.repository';
import slugify from 'slugify';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(private readonly userRepository: UserRepository) {}

  async createEnrichedUser(createUserDto: CreateUserDto) {
    const { uuid, name } = createUserDto;
    const slug = slugify(name, { lower: true });

    const enrichedUser = {
      uuid,
      name,
      linkedin: `linkedin.com/in/${slug}`,
      github: `github.com/${slug}`,
    };

    this.logger.log(`Creating enriched user for ${uuid}`);
    return this.userRepository.create(enrichedUser);
  }

  async findByUuid(uuid: string) {
    const user = await this.userRepository.findByUuid(uuid);
    if (!user) {
      throw new NotFoundException(`User with UUID ${uuid} not found`);
    }
    return user;
  }
}
