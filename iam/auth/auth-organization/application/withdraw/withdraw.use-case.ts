import { Inject, Injectable } from '@nestjs/common';
import { AUTH_ORGANIZATION_STORE, AuthOrganizationStore } from '../../domain/auth-organization.store';
import { WithdrawOrganizationCommand } from './withdraw.command';
import { Transactional } from '@mikro-orm/core';
import { DeleteOrganizationUseCase } from 'iam/organization/application/delete/delete.use-case';

@Injectable()
export class WithdrawOrganizationUseCase {
  constructor(
    @Inject(AUTH_ORGANIZATION_STORE)
    private readonly authOrganizationStore: AuthOrganizationStore,
    private readonly deleteOrganizationUseCase: DeleteOrganizationUseCase,
  ) {}

  @Transactional()
  async execute(command: WithdrawOrganizationCommand): Promise<void> {
    const { organizationId } = command;
    await this.authOrganizationStore.deleteById(organizationId);
    await this.deleteOrganizationUseCase.execute({ organizationId });
  }
}
