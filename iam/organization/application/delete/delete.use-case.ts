import { Inject, Injectable } from '@nestjs/common';
import { ORGANIZATION_STORE, OrganizationStore } from '../../domain/organization.store';
import { CustomException } from 'src/shared/exception/custom-exception';
import { CustomExceptionCode } from 'src/shared/exception/custom-exception-code';
import { DeleteOrganizationCommand } from './delete.command';

@Injectable()
export class DeleteOrganizationUseCase {
  constructor(
    @Inject(ORGANIZATION_STORE)
    private readonly organizationStore: OrganizationStore,
  ) {}

  async execute(command: DeleteOrganizationCommand): Promise<void> {
    const { organizationId } = command;
    const organization = await this.organizationStore.loadById(organizationId);
    if (!organization) throw new CustomException(CustomExceptionCode.ORGANIZATION_NOT_FOUND);

    organization.delete();
    await this.organizationStore.deleteById(organizationId);
  }
}
