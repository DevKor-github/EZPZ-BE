import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AuthDeletedEvent } from 'src/auth/auth-user/domain/event/auth-deleted.event';
import { DeleteMyInfoHandler } from './delete.handler';
import { DeleteMyInfoCommand } from './delete.command';

@EventsHandler(AuthDeletedEvent)
export class DeleteUserListener implements IEventHandler<AuthDeletedEvent> {
  constructor(private readonly deleteMyInfoHandler: DeleteMyInfoHandler) {}

  async handle(event: AuthDeletedEvent) {
    const deleteMyInfoCommand = new DeleteMyInfoCommand(event.userId);

    await this.deleteMyInfoHandler.execute(deleteMyInfoCommand);
  }
}
