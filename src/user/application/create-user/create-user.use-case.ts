import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { User } from 'src/user/domain/entity/user';
import { UserRepository } from 'src/user/domain/repository/user.repository';
import { UserEntity } from 'src/user/infrastructure/orm-entity/user.entity';
import { CreateUserRequestDto } from './dto/create-user.request.dto';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: UserRepository,
  ) {}

  async execute(createUserRequestDto: CreateUserRequestDto): Promise<void> {
    const { userId, email, role } = createUserRequestDto;
    const now = new Date();
    const user = User.create({
      id: userId,
      createdAt: now,
      updatedAt: now,
      email: email,
      role: role,
    });

    await this.userRepository.save(user);
  }
}
