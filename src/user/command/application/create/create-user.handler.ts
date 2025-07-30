import { Inject, Injectable } from '@nestjs/common';
import { USER_COMMAND_REPOSITORY, UserCommandRepository } from '../../domain/user.command.repository';
import { User } from '../../domain/user';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from './create.command';

@Injectable()
@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    @Inject(USER_COMMAND_REPOSITORY)
    private readonly userCommandRepository: UserCommandRepository,
  ) {}

  async execute(command: CreateUserCommand): Promise<void> {
    const { userId, email, role } = command;
    const now = new Date();
    const user = User.create({
      id: userId,
      createdAt: now,
      updatedAt: now,
      email: email,
      role: role,
    });

    await this.userCommandRepository.save(user);
  }
}
