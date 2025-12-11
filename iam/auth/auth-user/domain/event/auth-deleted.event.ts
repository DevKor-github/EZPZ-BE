import { BaseDomainEvent } from 'src/shared/core/domain/base.domain-event';

export class AuthDeletedEvent implements BaseDomainEvent {
  readonly timestamp: Date;

  constructor(public readonly userId: string) {
    this.timestamp = new Date();
  }
}
