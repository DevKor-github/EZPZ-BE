import { Inject, Injectable } from '@nestjs/common';
import { CreateAuthOrganizationCommand } from './create.command';
import { AUTH_ORGANIZATION_STORE, AuthOrganizationStore } from '../../domain/auth-organization.store';
import { CustomException } from 'src/shared/exception/custom-exception';
import { CustomExceptionCode } from 'src/shared/exception/custom-exception-code';
import { Identifier } from 'src/shared/core/domain/identifier';
import { AuthOrganization } from '../../domain/auth-organization';
import { AccountId } from '../../domain/vo/account-id';
import { PasswordHash } from '../../domain/vo/password-hash';
import { EventBus } from '@nestjs/cqrs';
import { AuthOrganizationCreatedEvent } from '../../domain/event/auth-organization-created.event';
import { PASSWORD_HASHER, PasswordHasher } from '../../domain/password-hasher';
import { RawPassword } from '../../domain/vo/raw-password';

@Injectable()
export class CreateAuthOrganizationUseCase {
  constructor(
    @Inject(AUTH_ORGANIZATION_STORE)
    private readonly authOrganizationStore: AuthOrganizationStore,
    @Inject(PASSWORD_HASHER)
    private readonly passwordHasher: PasswordHasher,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: CreateAuthOrganizationCommand) {
    const existingAuth = await this.authOrganizationStore.loadByAccountId(command.accountId);
    if (existingAuth) throw new CustomException(CustomExceptionCode.AUTH_ORGANIZATION_ACCOUNT_ID_ALREADY_EXISTS);

    const rawPassword = RawPassword.create(command.password);
    const hashedPassword = await this.passwordHasher.hash(rawPassword.value);

    const authOrganization = AuthOrganization.create({
      id: Identifier.create(),
      accountId: AccountId.create(command.accountId),
      passwordHash: PasswordHash.create(hashedPassword),
      refreshToken: null,
      organizationId: Identifier.create(),
      createdAt: new Date(),
      updatedAt: new Date(),
      isDeleted: false,
      deletedAt: null,
    });

    await this.authOrganizationStore.save(authOrganization);

    await this.eventBus.publish(
      new AuthOrganizationCreatedEvent(authOrganization.organizationId.value, command.name, command.contact),
    );
  }
}
