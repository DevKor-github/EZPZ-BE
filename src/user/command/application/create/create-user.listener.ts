import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AuthCreatedEvent } from 'src/auth/auth-user/domain/event/auth-created.event';
import { CreateUserHandler } from './create-user.handler';
import { CreateUserCommand } from './create.command';

@EventsHandler(AuthCreatedEvent)
export class CreateUserListener implements IEventHandler<AuthCreatedEvent> {
  constructor(private readonly createUserHandler: CreateUserHandler) {}

  async handle(event: AuthCreatedEvent): Promise<void> {
    const { userId, email } = event;

    const createUserCommand = new CreateUserCommand(userId, email);

    await this.createUserHandler.execute(createUserCommand);
  }
}
