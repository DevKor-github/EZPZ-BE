import { Inject, Injectable } from '@nestjs/common';
import { User } from '../../domain/user';
import { CreateUserCommand } from './create.command';
import { USER_STORE, UserStore } from 'iam/user/domain/user.store';
import { Identifier } from 'src/shared/core/domain/identifier';
import { CreateUserResult } from './create.result';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject(USER_STORE)
    private readonly userStore: UserStore,
  ) {}

  async execute(command: CreateUserCommand): Promise<CreateUserResult> {
    const { email } = command;
    const now = new Date();
    const user = User.create({
      id: Identifier.create(),
      createdAt: now,
      updatedAt: now,
      email: email,
    });

    await this.userStore.save(user);

    return { userId: user.id.value };
  }
}
