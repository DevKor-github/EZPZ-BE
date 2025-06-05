import { Inject, Injectable } from '@nestjs/common';
import { User } from 'src/user/domain/entity/user';
import { USER_REPOSITORY, UserRepository } from 'src/user/domain/repository/user.repository';
import { CreateUserRequestDto } from './dto/create-user.request.dto';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
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
