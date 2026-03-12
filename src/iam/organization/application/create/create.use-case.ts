import { Inject, Injectable } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';
import { CreateOrganizationCommand } from './create.command';
import { ORGANIZATION_STORE, OrganizationStore } from '../../domain/organization.store';
import { Organization } from '../../domain/organization';
import { CreateOrganizationResult } from './create.result';
import { Identifier } from 'src/shared/core/domain/identifier';

@Injectable()
@CommandHandler(CreateOrganizationCommand)
export class CreateOrganizationUseCase {
  constructor(
    @Inject(ORGANIZATION_STORE)
    private readonly organizationStore: OrganizationStore,
  ) {}

  async execute(command: CreateOrganizationCommand): Promise<CreateOrganizationResult> {
    const { name, contact } = command;

    const organization = Organization.create({
      id: Identifier.create(),
      name: name,
      contact: contact,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await this.organizationStore.save(organization);

    return { organizationId: organization.id.value };
  }
}
