import { BaseDomainEvent } from 'src/shared/core/domain/base.domain-event';

export class UserDeletedEvent implements BaseDomainEvent {
  readonly timesstamp: Date;

  constructor(public readonly userId: string) {
    this.timesstamp = new Date();
  }
}
