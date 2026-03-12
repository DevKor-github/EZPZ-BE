import { InjectRepository } from '@mikro-orm/nestjs';
import { AuthOrganization } from '../domain/auth-organization';
import { AuthOrganizationStore } from '../domain/auth-organization.store';
import { AuthOrganizationEntity } from './auth-organization.entity';
import { EntityManager, EntityRepository } from '@mikro-orm/mysql';
import { AuthOrganizationMapper } from './auth-organization.mapper';

export class AuthOrganizationStoreImpl implements AuthOrganizationStore {
  constructor(
    @InjectRepository(AuthOrganizationEntity)
    private readonly ormRepository: EntityRepository<AuthOrganizationEntity>,
    private readonly em: EntityManager,
  ) {}

  async save(authOrganization: AuthOrganization): Promise<void> {
    const authOrganizationEntity = AuthOrganizationMapper.toPersistence(authOrganization);
    await this.em.persistAndFlush(authOrganizationEntity);
  }

  async update(authOrganization: AuthOrganization): Promise<void> {
    await this.em.nativeUpdate(
      AuthOrganizationEntity,
      { id: authOrganization.id.value },
      {
        passwordHash: authOrganization.passwordHash.value,
        refreshToken: authOrganization.refreshToken,
        updatedAt: authOrganization.updatedAt,
      },
    );
  }

  async loadByOrganizationId(organizationId: string): Promise<AuthOrganization | null> {
    const authOrganizationEntity = await this.ormRepository.findOne({ organizationId });
    if (authOrganizationEntity == null) return null;

    return AuthOrganizationMapper.toDomain(authOrganizationEntity);
  }

  async loadByRefreshToken(refreshToken: string): Promise<AuthOrganization | null> {
    const authOrganizationEntity = await this.ormRepository.findOne({ refreshToken });
    if (authOrganizationEntity == null) return null;

    return AuthOrganizationMapper.toDomain(authOrganizationEntity);
  }

  async loadByAccountId(accountId: string): Promise<AuthOrganization | null> {
    const authOrganizationEntity = await this.ormRepository.findOne({ accountId });
    if (authOrganizationEntity == null) return null;

    return AuthOrganizationMapper.toDomain(authOrganizationEntity);
  }

  async existsByAccountId(accountId: string): Promise<boolean> {
    const count = await this.ormRepository.count({ accountId });
    return count > 0;
  }

  async deleteById(organizationId: string): Promise<void> {
    await this.em.nativeDelete(AuthOrganizationEntity, { organizationId });
  }
}
