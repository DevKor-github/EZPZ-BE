import { Inject, Injectable } from '@nestjs/common';
import { ORGANIZATION_STORE, OrganizationStore } from '../../domain/organization.store';
import { DeleteOrganizationCommand } from './delete-organization.command';
import { CustomException } from 'src/shared/exception/custom-exception';
import { CustomExceptionCode } from 'src/shared/exception/custom-exception-code';

@Injectable()
export class DeleteOrganizationUseCase {
  constructor(
    @Inject(ORGANIZATION_STORE)
    private readonly organizationStore: OrganizationStore,
  ) {}

  async execute(command: DeleteOrganizationCommand): Promise<void> {
    const organization = await this.organizationStore.loadById(command.organizationId);
    if (!organization) throw new CustomException(CustomExceptionCode.ORGANIZATION_NOT_FOUND);

    const { organizationId } = command;
    await this.organizationStore.deleteById(organizationId);
  }
}
