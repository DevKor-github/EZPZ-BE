import { Inject, Injectable } from '@nestjs/common';
import { ChangePasswordCommand } from './change-password.command';
import { AUTH_ORGANIZATION_STORE, AuthOrganizationStore } from '../../domain/auth-organization.store';
import { CustomException } from 'src/shared/exception/custom-exception';
import { CustomExceptionCode } from 'src/shared/exception/custom-exception-code';
import { PASSWORD_HASHER, PasswordHasher } from 'iam/auth/auth-core/domain/password-hasher';
import { PasswordHash } from 'iam/auth/auth-core/domain/value-object/password-hash';

@Injectable()
export class ChangeOrganizationPasswordUseCase {
  constructor(
    @Inject(AUTH_ORGANIZATION_STORE)
    private readonly authOrganizationStore: AuthOrganizationStore,
    @Inject(PASSWORD_HASHER)
    private readonly passwordHasher: PasswordHasher,
  ) {}

  async execute(command: ChangePasswordCommand) {
    const { organizationId, currentPassword, newPassword } = command;

    const authOrganization = await this.authOrganizationStore.loadByOrganizationId(organizationId);
    if (!authOrganization) throw new CustomException(CustomExceptionCode.AUTH_ORGANIZATION_NOT_FOUND);

    console.log('currentPassword:', currentPassword);
    console.log('authOrganization.passwordHash.value:', authOrganization.passwordHash.value);

    const isPasswordValid = await this.passwordHasher.compare(currentPassword, authOrganization.passwordHash.value);
    if (!isPasswordValid) throw new CustomException(CustomExceptionCode.AUTH_INVALID_CURRENT_PASSWORD);

    const newPasswordHash = await this.passwordHasher.hash(newPassword);
    authOrganization.updatePassword(PasswordHash.create(newPasswordHash));

    await this.authOrganizationStore.update(authOrganization);
  }
}
