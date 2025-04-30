import { Role } from 'src/auth/domain/value-object/role.enum';
import { BaseEntityProps } from 'src/shared/domain/base/base.entity';

export interface UserProps extends BaseEntityProps {
  oauthId: string;
  email: string;
  role: Role;
}
export class User {
  private readonly props: UserProps;

  private constructor(props: UserProps) {
    this.props = props;
  }

  get OauthId(): string {
    return this.props.oauthId;
  }

  get Email(): string {
    return this.props.email;
  }

  get Role(): Role {
    return this.props.role;
  }
}
