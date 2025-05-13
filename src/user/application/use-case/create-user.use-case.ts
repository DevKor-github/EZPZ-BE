import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { Identifier } from 'src/shared/domain/value-object/identifier';
import { User } from 'src/user/domain/entity/user';
import { UserRepository } from 'src/user/domain/repository/user.repository';
import { Role } from 'src/user/domain/value-object/role.enum';
import { UserEntity } from 'src/user/infrastructure/orm-entity/user.entity';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: UserRepository,
  ) {}

  async execute(userId: Identifier, email: string, role: Role): Promise<void> {
    const now = new Date();
    const user = User.create({
      id: userId,
      createdAt: now,
      updatedAt: now,
      email: email,
      role: role,
      scrapIds: [],
    });

    await this.userRepository.save(user);
  }
}
