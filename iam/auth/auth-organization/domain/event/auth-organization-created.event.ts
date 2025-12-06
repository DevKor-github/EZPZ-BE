import { BaseDomainEvent } from 'src/shared/core/domain/base.domain-event';

export class AuthOrganizationCreatedEvent implements BaseDomainEvent {
  readonly timestamp: Date;

  constructor(
    public readonly organizationId: string,
    public readonly name: string,
    public readonly contact: string,
  ) {
    this.timestamp = new Date();
  }
}
