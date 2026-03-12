import { BaseDomainEvent } from 'src/shared/core/domain/base.domain-event';

export class UserDeletedEvent implements BaseDomainEvent {
  readonly timestamp: Date;

  constructor(public readonly userId: string) {
    this.timestamp = new Date();
  }
}
