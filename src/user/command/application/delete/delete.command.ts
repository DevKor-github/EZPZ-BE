import { IEvent } from '@nestjs/cqrs';

export class DeleteMyInfoCommand implements IEvent {
  constructor(public readonly userId: string) {}
}
