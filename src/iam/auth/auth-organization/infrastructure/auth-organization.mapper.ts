import { Identifier } from 'src/shared/core/domain/identifier';
import { AuthOrganization } from '../domain/auth-organization';
import { AuthOrganizationEntity } from './auth-organization.entity';
import { AccountId } from '../domain/vo/account-id';
import { PasswordHash } from 'src/iam/auth/auth-core/domain/value-object/password-hash';

export class AuthOrganizationMapper {
  static toDomain(entity: AuthOrganizationEntity): AuthOrganization {
    return AuthOrganization.of({
      id: Identifier.from(entity.id),
      accountId: AccountId.create(entity.accountId),
      passwordHash: PasswordHash.create(entity.passwordHash),
      refreshToken: entity.refreshToken,
      organizationId: Identifier.from(entity.organizationId),
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      isDeleted: entity.isDeleted,
      deletedAt: entity.deletedAt,
    });
  }

  static toPersistence(domain: AuthOrganization): AuthOrganizationEntity {
    const entity = new AuthOrganizationEntity();
    entity.id = domain.id.value;
    entity.accountId = domain.accountId.value;
    entity.passwordHash = domain.passwordHash.value;
    entity.refreshToken = domain.refreshToken;
    entity.organizationId = domain.organizationId.value;
    entity.createdAt = domain.createdAt;
    entity.updatedAt = domain.updatedAt;
    entity.isDeleted = domain.isDeleted;
    entity.deletedAt = domain.deletedAt;

    return entity;
  }
}
