import { BaseDomainEntity, BaseEntityProps } from 'src/shared/domain/entity/base.entity';
import { Identifier } from 'src/shared/domain/value-object/identifier';

export interface AuthProps extends BaseEntityProps {
  oauthId: string;
  provider: string;
  refreshToken: string;
  userId: Identifier;
}

export class Auth extends BaseDomainEntity<AuthProps> {
  constructor(props: AuthProps) {
    super(props);
  }

  updateRefreshToken(refreshToken: string, updatedAt: Date): void {
    this.props.refreshToken = refreshToken;
    this.props.updatedAt = updatedAt;
  }

  public static create(props: AuthProps): Auth {
    return new Auth(props);
  }

  get oauthId(): string {
    return this.props.oauthId;
  }

  get provider(): string {
    return this.props.provider;
  }

  get refreshToken(): string {
    return this.props.refreshToken;
  }

  get userId(): Identifier {
    return this.props.userId;
  }
}
