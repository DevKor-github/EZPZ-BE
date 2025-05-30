import { Role } from 'src/user/domain/value-object/role.enum';
import { BaseDomainEntity, BaseEntityProps } from 'src/shared/domain/entity/base.entity';

export interface UserProps extends BaseEntityProps {
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

  get email(): string {
    return this.props.email;
  }

  get role(): Role {
    return this.props.role;
  }
}
