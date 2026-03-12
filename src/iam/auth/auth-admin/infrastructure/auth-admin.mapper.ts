import { Identifier } from 'src/shared/core/domain/identifier';
import { AuthAdmin } from '../domain/auth-admin';
import { AuthAdminEntity } from './auth-admin.entity';
import { AccountId } from 'src/iam/auth/auth-organization/domain/vo/account-id';
import { PasswordHash } from 'src/iam/auth/auth-core/domain/value-object/password-hash';

export class AuthAdminMapper {
  static toEntity(domain: AuthAdmin): AuthAdminEntity {
    const entity = new AuthAdminEntity();
    entity.id = domain.id.value;
    entity.accountId = domain.accountId.value;
    entity.passwordHash = domain.passwordHash.value;
    entity.adminId = domain.adminId.value;
    entity.isDeleted = domain.isDeleted;
    entity.deletedAt = domain.deletedAt;
    entity.createdAt = domain.createdAt;
    entity.updatedAt = domain.updatedAt;
    return entity;
  }

  static toDomain(entity: AuthAdminEntity): AuthAdmin {
    return new AuthAdmin({
      id: Identifier.from(entity.id),
      accountId: AccountId.create(entity.accountId),
      passwordHash: PasswordHash.create(entity.passwordHash),
      adminId: Identifier.from(entity.adminId),
      isDeleted: entity.isDeleted,
      deletedAt: entity.deletedAt,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    });
  }
}
