import { Inject, Injectable } from '@nestjs/common';
import { USER_COMMAND_REPOSITORY, UserCommandRepository } from '../../domain/user.command.repository';
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { DeleteMyInfoCommand } from './delete.command';
import { CustomException } from 'src/shared/exception/custom-exception';
import { CustomExceptionCode } from 'src/shared/exception/custom-exception-code';

@Injectable()
@CommandHandler(DeleteMyInfoCommand)
export class DeleteMyInfoHandler implements ICommandHandler<DeleteMyInfoCommand> {
  constructor(
    @Inject(USER_COMMAND_REPOSITORY)
    private readonly userCommandRepository: UserCommandRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: DeleteMyInfoCommand): Promise<void> {
    const { userId } = command;

    const user = await this.userCommandRepository.findById(userId);
    if (!user) {
      throw new CustomException(CustomExceptionCode.USER_NOT_FOUND);
    }

    user.delete();

    await this.userCommandRepository.deleteById(userId);

    await this.eventBus.publishAll(user.pullDomainEvents());
  }
}
