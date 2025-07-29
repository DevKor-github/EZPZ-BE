import { BaseDomainEvent } from './base.domain-event';
import { BaseDomainEntity, BaseEntityProps } from './base.entity';

export abstract class AggregateRoot<Props extends BaseEntityProps> extends BaseDomainEntity<Props> {
  private readonly domainEvents: BaseDomainEvent[] = [];

  protected addDomainEvent(event: BaseDomainEvent): void {
    this.domainEvents.push(event);
  }

  public pullDomainEvents(): BaseDomainEvent[] {
    const events = [...this.domainEvents];
    this.domainEvents.length = 0;

    return events;
  }
}
