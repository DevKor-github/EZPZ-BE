import { Inject, Injectable } from '@nestjs/common';
import { DeleteMyInfoCommand } from './delete.command';
import { CustomException } from 'src/shared/exception/custom-exception';
import { CustomExceptionCode } from 'src/shared/exception/custom-exception-code';
import { USER_STORE, UserStore } from 'iam/user/domain/user.store';
import { EventBus } from '@nestjs/cqrs';

@Injectable()
export class DeleteUserUseCase {
  constructor(
    @Inject(USER_STORE)
    private readonly userStore: UserStore,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: DeleteMyInfoCommand): Promise<void> {
    const { userId } = command;

    const user = await this.userStore.findById(userId);
    if (!user) {
      throw new CustomException(CustomExceptionCode.USER_NOT_FOUND);
    }

    user.delete();

    await this.userStore.deleteById(userId);

    await this.eventBus.publishAll(user.pullDomainEvents());
  }
}
