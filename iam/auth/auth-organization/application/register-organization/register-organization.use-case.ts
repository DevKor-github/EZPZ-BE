import { Inject, Injectable } from '@nestjs/common';
import { RegisterOrganizationCommand } from './register-organization.command';
import { AUTH_ORGANIZATION_STORE, AuthOrganizationStore } from '../../domain/auth-organization.store';
import { CustomException } from 'src/shared/exception/custom-exception';
import { CustomExceptionCode } from 'src/shared/exception/custom-exception-code';
import { Identifier } from 'src/shared/core/domain/identifier';
import { AuthOrganization } from '../../domain/auth-organization';
import { AccountId } from '../../domain/vo/account-id';
import { RawPassword } from '../../domain/vo/raw-password';
import { PASSWORD_HASHER, PasswordHasher } from 'iam/auth/auth-core/domain/password-hasher';
import { CreateOrganizationUseCase } from 'iam/organization/application/create/create.use-case';
import { PasswordHash } from 'iam/auth/auth-core/domain/value-object/password-hash';
import { Transactional } from '@mikro-orm/core';

@Injectable()
export class RegisterOrganizationUseCase {
  constructor(
    @Inject(AUTH_ORGANIZATION_STORE)
    private readonly authOrganizationStore: AuthOrganizationStore,
    @Inject(PASSWORD_HASHER)
    private readonly passwordHasher: PasswordHasher,
    private readonly createOrganiationUseCase: CreateOrganizationUseCase,
  ) {}

  @Transactional()
  async execute(command: RegisterOrganizationCommand) {
    const { accountId, password, name, contact } = command;

    const existingAuth = await this.authOrganizationStore.loadByAccountId(command.accountId.trim());
    if (existingAuth) throw new CustomException(CustomExceptionCode.AUTH_ORGANIZATION_ACCOUNT_ID_ALREADY_EXISTS);

    const organizationId = await this.createOrganization(name, contact);
    await this.createAuthOrganization(accountId, password, organizationId);
  }

  private async createAuthOrganization(
    accountId: string,
    password: string,
    organizationId: string,
  ): Promise<AuthOrganization> {
    const rawPassword = RawPassword.create(password.trim());
    const hashedPassword = await this.passwordHasher.hash(rawPassword.value);

    const authOrganization = AuthOrganization.create({
      id: Identifier.create(),
      accountId: AccountId.create(accountId.trim()),
      passwordHash: PasswordHash.create(hashedPassword),
      refreshToken: null,
      organizationId: Identifier.from(organizationId),
      createdAt: new Date(),
      updatedAt: new Date(),
      isDeleted: false,
      deletedAt: null,
    });

    await this.authOrganizationStore.save(authOrganization);

    return authOrganization;
  }

  private async createOrganization(name: string, contact: string): Promise<string> {
    const result = await this.createOrganiationUseCase.execute({ name, contact });

    return result.organizationId;
  }
}
