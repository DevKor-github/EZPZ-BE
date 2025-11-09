import { Inject, Injectable } from '@nestjs/common';
import { UpdateOrganizationCommand } from './update-organization.command';
import { ORGANIZATION_STORE, OrganizationStore } from '../../domain/organization.store';
import { CustomException } from 'src/shared/exception/custom-exception';
import { CustomExceptionCode } from 'src/shared/exception/custom-exception-code';

@Injectable()
export class UpdateOrganizationUseCase {
  constructor(
    @Inject(ORGANIZATION_STORE)
    private readonly organizationStore: OrganizationStore,
  ) {}

  async execute(command: UpdateOrganizationCommand): Promise<void> {
    const organization = await this.organizationStore.loadById(command.organizationId);
    if (!organization) throw new CustomException(CustomExceptionCode.ORGANIZATION_NOT_FOUND);

    organization.update(command.name, command.contact);

    await this.organizationStore.updateById(organization);
  }
}
