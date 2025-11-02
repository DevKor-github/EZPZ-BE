import { Inject, Injectable } from '@nestjs/common';
import { USER_COMMAND_REPOSITORY, UserCommandRepository } from '../../domain/user.command.repository';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteMyInfoCommand } from './delete.command';

@Injectable()
@CommandHandler(DeleteMyInfoCommand)
export class DeleteMyInfoHandler implements ICommandHandler<DeleteMyInfoCommand> {
  constructor(
    @Inject(USER_COMMAND_REPOSITORY)
    private readonly userCommandRepository: UserCommandRepository,
  ) {}

  async execute(command: DeleteMyInfoCommand): Promise<void> {
    const { userId } = command;

    await this.userCommandRepository.deleteById(userId);
  }
}
