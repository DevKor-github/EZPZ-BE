import { BaseDomainEntity, BaseEntityProps } from 'src/shared/domain/base/base.entity';

export interface AuthProps extends BaseEntityProps {
  refreshToken: string;
  userId: number;
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

  get userId(): number {
    return this.props.userId;
  }
}
