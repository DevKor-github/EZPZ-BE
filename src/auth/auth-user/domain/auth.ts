import { BaseEntityProps } from 'src/shared/core/domain/base.entity';
import { Identifier } from 'src/shared/core/domain/identifier';
import { OAuthProviderType } from './value-object/oauth-provider.enum';
import { AggregateRoot } from 'src/shared/core/domain/base.aggregate';
import { CustomException } from 'src/shared/exception/custom-exception';
import { CustomExceptionCode } from 'src/shared/exception/custom-exception-code';
import { LoginSucceededEvent } from './event/login-succeeded.event';

export interface AuthProps extends BaseEntityProps {
  oauthId: string;
  provider: OAuthProviderType;
  refreshToken: string | null;
  oauthAccessToken: string | null;
  userId: Identifier;
}

export class Auth extends AggregateRoot<AuthProps> {
  constructor(props: AuthProps) {
    super(props);
  }

  public static create(props: AuthProps): Auth {
    const auth = new Auth(props);
    auth.validate();
    auth.addDomainEvent(new LoginSucceededEvent(auth.userId, auth.provider));

    return auth;
  }

  public static of(props: AuthProps): Auth {
    return new Auth(props);
  }

  public validate(): void {
    if (!this.props.oauthId) {
      throw new CustomException(CustomExceptionCode.AUTH_OAUTH_ID_EMPTY);
    }

    if (!this.props.provider) {
      throw new CustomException(CustomExceptionCode.AUTH_PROVIDER_EMPTY);
    }
    if (!Object.values(OAuthProviderType).includes(this.props.provider)) {
      throw new CustomException(CustomExceptionCode.AUTH_INVALID_PROVIDER);
    }

    if (!this.props.userId) {
      throw new CustomException(CustomExceptionCode.AUTH_USER_ID_EMPTY);
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
