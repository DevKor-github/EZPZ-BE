import { BaseDomainEvent } from 'src/shared/core/domain/base.domain-event';

export class ScrapDeletedEvent implements BaseDomainEvent {
  readonly timesstamp: Date;

  constructor(
    public readonly userId: string,
    public readonly articleId: string,
    public readonly tags: string[],
  ) {
    this.timesstamp = new Date();
  }
}
