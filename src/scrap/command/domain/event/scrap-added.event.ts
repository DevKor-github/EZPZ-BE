import { BaseDomainEvent } from 'src/shared/core/domain/base.domain-event';

export class ScrapAddedEvent implements BaseDomainEvent {
  readonly timesstamp: Date;

  constructor(
    public readonly articleId: string,
    public readonly userId: string,
  ) {
    this.timesstamp = new Date();
  }
}
