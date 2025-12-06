import { Inject, Injectable } from '@nestjs/common';
import { User } from '../../domain/user';
import { CreateUserCommand } from './create.command';
import { USER_STORE, UserStore } from 'iam/user/domain/user.store';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject(USER_STORE)
    private readonly userStore: UserStore,
  ) {}

  async execute(command: CreateUserCommand): Promise<void> {
    const { userId, email } = command;
    const now = new Date();
    const user = User.create({
      id: userId,
      createdAt: now,
      updatedAt: now,
      email: email,
    });

    await this.userStore.save(user);
  }
}
