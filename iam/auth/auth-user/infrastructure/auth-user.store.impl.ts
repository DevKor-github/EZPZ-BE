import { EntityManager, EntityRepository } from '@mikro-orm/mysql';
import { InjectRepository } from '@mikro-orm/nestjs';
import { AuthUserEntity } from './auth-user.entity';
import { AuthUserMapper } from './auth-user.mapper';
import { CustomException } from 'src/shared/exception/custom-exception';
import { CustomExceptionCode } from 'src/shared/exception/custom-exception-code';
import { AuthUserStore } from '../domain/auth-user.repository';
import { AuthUser } from '../domain/auth-user';
import { OAuthProviderType } from '../domain/value-object/oauth-provider.enum';

export class AuthUserStoreImpl implements AuthUserStore {
  constructor(
    @InjectRepository(AuthUserEntity)
    private readonly authOrmRepository: EntityRepository<AuthUserEntity>,
    private readonly em: EntityManager,
  ) {}
  async save(authUser: AuthUser): Promise<void> {
    const authUserEntity = AuthUserMapper.toEntity(authUser);
    await this.em.persistAndFlush(authUserEntity);
  }

  async findByOAuthIdandProvider(oauthId: string, provider: OAuthProviderType): Promise<AuthUser | null> {
    const authUserEntity = await this.authOrmRepository.findOne({ oauthId, provider });
    if (!authUserEntity) return null;

    return AuthUserMapper.toDomain(authUserEntity);
  }

  async findByRefreshToken(refreshToken: string): Promise<AuthUser | null> {
    const authUserEntity = await this.authOrmRepository.findOne({ refreshToken });
    if (!authUserEntity) return null;

    return AuthUserMapper.toDomain(authUserEntity);
  }

  async update(authUser: AuthUser): Promise<void> {
    await this.em.nativeUpdate(
      AuthUserEntity,
      { id: authUser.id.value },
      {
        refreshToken: authUser.refreshToken,
        updatedAt: authUser.updatedAt,
      },
    );
  }

  async findByUserId(userId: string): Promise<AuthUser | null> {
    const authUserEntity = await this.authOrmRepository.findOne({ userId });
    if (!authUserEntity) return null;

    return AuthUserMapper.toDomain(authUserEntity);
  }

  async deleteById(id: string): Promise<void> {
    const authUserEntity = await this.authOrmRepository.findOne({ id });
    if (!authUserEntity) throw new CustomException(CustomExceptionCode.AUTH_USER_NOT_FOUND);

    await this.em.removeAndFlush(authUserEntity);
  }
}
