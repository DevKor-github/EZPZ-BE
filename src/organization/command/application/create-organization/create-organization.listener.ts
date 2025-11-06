import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AuthOrganizationCreatedEvent } from 'src/auth/auth-organization/domain/event/auth-organization-created.event';
import { CreateOrganizationUseCase } from './create-organization.use-case';
import { Identifier } from 'src/shared/core/domain/identifier';
import { Transactional } from '@mikro-orm/core';

@EventsHandler(AuthOrganizationCreatedEvent)
export class CreateOrganizationListener implements IEventHandler<AuthOrganizationCreatedEvent> {
  constructor(private readonly createOrganizationUseCase: CreateOrganizationUseCase) {}

  @Transactional()
  async handle(event: AuthOrganizationCreatedEvent) {
    await this.createOrganizationUseCase.execute({
      organizationId: Identifier.from(event.organizationId),
      name: event.name,
      contact: event.contact,
    });
  }
}
