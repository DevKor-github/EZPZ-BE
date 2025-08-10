import { BaseDomainEvent } from 'src/shared/core/domain/base.domain-event';

export class ScrapDeletedEvent implements BaseDomainEvent {
  readonly timesstamp: Date;

  constructor(public readonly articleId: string) {
    this.timesstamp = new Date();
  }
}
