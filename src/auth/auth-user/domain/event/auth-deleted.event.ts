import { BaseDomainEvent } from 'src/shared/core/domain/base.domain-event';

export class AuthDeletedEvent implements BaseDomainEvent {
  readonly timesstamp: Date;

  constructor(public readonly userId: string) {
    this.timesstamp = new Date();
  }
}
