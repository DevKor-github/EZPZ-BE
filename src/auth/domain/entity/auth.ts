import { BaseEntityProps } from 'src/shared/domain/base/base.entity';

export interface AuthProps extends BaseEntityProps {
  refreshToken: string;
  userId: number;
}

export class Auth {
  private readonly props: AuthProps;

  constructor(props: AuthProps) {
    this.props = props;
  }

  get refreshToken(): string {
    return this.props.refreshToken;
  }

  get userId(): number {
    return this.props.userId;
  }
}
