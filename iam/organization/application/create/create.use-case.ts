import { Inject, Injectable } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';
import { CreateOrganizationCommand } from './create.command';
import { ORGANIZATION_STORE, OrganizationStore } from '../../domain/organization.store';
import { Organization } from '../../domain/organization';

@Injectable()
@CommandHandler(CreateOrganizationCommand)
export class CreateOrganizationUseCase {
  constructor(
    @Inject(ORGANIZATION_STORE)
    private readonly organizationStore: OrganizationStore,
  ) {}

  async execute(command: CreateOrganizationCommand): Promise<void> {
    const { organizationId, name, contact } = command;

    const organization = Organization.create({
      id: organizationId,
      name: name,
      contact: contact,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await this.organizationStore.save(organization);
  }
}
