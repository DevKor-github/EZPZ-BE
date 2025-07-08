import { BaseDomainEntity, BaseEntityProps } from 'src/shared/domain/entity/base.entity';
import { Identifier } from 'src/shared/domain/value-object/identifier';
import { OAuthProviderType } from '../value-object/oauth-provider.enum';

export interface AuthProps extends BaseEntityProps {
  oauthId: string;
  provider: OAuthProviderType;
  refreshToken: string | null;
  oauthAccessToken: string | null;
  userId: Identifier;
}

export class Auth extends BaseDomainEntity<AuthProps> {
  constructor(props: AuthProps) {
    super(props);
  }

  public static create(props: AuthProps): Auth {
    const auth = new Auth(props);
    auth.validate();

    return auth;
  }

  public validate(): void {
    if (!this.props.oauthId) {
      throw new Error('OAuth ID는 필수입니다.');
    }

    if (!this.props.provider) {
      throw new Error('OAuth 제공자는 필수입니다.');
    }
    if (!Object.values(OAuthProviderType).includes(this.props.provider)) {
      throw new Error('유효하지 않은 OAuth provider입니다.');
    }

    if (!this.props.userId) {
      throw new Error('사용자 ID는 필수입니다.');
    }
  }

  updateRefreshToken(refreshToken: string | null, updatedAt: Date): void {
    this.props.refreshToken = refreshToken;
    this.props.updatedAt = updatedAt;
  }

  get oauthId(): string {
    return this.props.oauthId;
  }

  get provider(): OAuthProviderType {
    return this.props.provider;
  }

  get refreshToken(): string | null {
    return this.props.refreshToken;
  }

  get oauthAccessToken(): string | null {
    return this.props.oauthAccessToken;
  }

  get userId(): Identifier {
    return this.props.userId;
  }
}
