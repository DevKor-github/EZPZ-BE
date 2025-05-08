import { BaseDomainEntity, BaseEntityProps } from 'src/shared/domain/base/base.entity';
import { Identifier } from 'src/shared/domain/value-object/identifier';

export interface AuthProps extends BaseEntityProps {
  refreshToken: string;
  userId: Identifier;
}

export class Auth extends BaseDomainEntity<AuthProps> {
  constructor(props: AuthProps) {
    super(props);
  }

  public static create(props: AuthProps): Auth {
    return new Auth(props);
  }

  get refreshToken(): string {
    return this.props.refreshToken;
  }

  get userId(): Identifier {
    return this.props.userId;
  }
}
