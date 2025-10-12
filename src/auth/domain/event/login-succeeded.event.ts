import { BaseDomainEvent } from 'src/shared/core/domain/base.domain-event';
import { Identifier } from 'src/shared/core/domain/identifier';

export class LoginSucceededEvent implements BaseDomainEvent {
  readonly timesstamp: Date;

  constructor(public readonly userId: Identifier) {
    this.timesstamp = new Date();
  }
}
