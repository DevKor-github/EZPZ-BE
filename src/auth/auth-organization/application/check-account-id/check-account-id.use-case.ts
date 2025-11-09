import { Inject, Injectable } from '@nestjs/common';
import { AUTH_ORGANIZATION_STORE, AuthOrganizationStore } from '../../domain/auth-organization.store';
import { CommandHandler } from '@nestjs/cqrs';
import { CheckAccountIdCommand } from './check-account-id.command';

@Injectable()
@CommandHandler(CheckAccountIdCommand)
export class CheckAccountIdUseCase {
  constructor(
    @Inject(AUTH_ORGANIZATION_STORE)
    private readonly authOrganizationStore: AuthOrganizationStore,
  ) {}

  async execute(command: CheckAccountIdCommand): Promise<boolean> {
    const { accountId } = command;
    const exists = await this.authOrganizationStore.existsByAccountId(accountId.trim());
    return exists;
  }
}
