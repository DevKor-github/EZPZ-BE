import { Inject, Injectable } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';
import { LogoutCommand } from './logout.command';
import { AUTH_ORGANIZATION_STORE, AuthOrganizationStore } from '../../domain/auth-organization.store';
import { CustomException } from 'src/shared/exception/custom-exception';
import { CustomExceptionCode } from 'src/shared/exception/custom-exception-code';

@Injectable()
@CommandHandler(LogoutCommand)
export class LogoutUseCase {
  constructor(
    @Inject(AUTH_ORGANIZATION_STORE)
    private readonly authOrganizationStore: AuthOrganizationStore,
  ) {}

  async execute(command: LogoutCommand): Promise<void> {
    const { organizationId } = command;

    const authOrganization = await this.authOrganizationStore.loadByOrganizationId(organizationId);
    if (!authOrganization) throw new CustomException(CustomExceptionCode.AUTH_ORGANIZATION_INVALID_ACCESS_TOKEN);

    authOrganization.updateRefreshToken(null);
    await this.authOrganizationStore.update(authOrganization);
  }
}
