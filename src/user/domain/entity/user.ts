import { Role } from 'src/auth/domain/value-object/role.enum';
import { BaseDomainEntity, BaseEntityProps } from 'src/shared/domain/base/base.entity';

export interface UserProps extends BaseEntityProps {
  oauthId: string;
  email: string;
  role: Role;
}
export class User extends BaseDomainEntity<UserProps> {
  protected constructor(props: UserProps) {
    super(props);
  }

  public static create(props: UserProps): User {
    return new User(props);
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
