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
    const user = new User(props);
    user.validate();

    return user;
  }

  public validate(): void {
    if (!this.props.email) {
      throw new Error('이메일은 필수입니다.');
    }
    if (!this.props.email || !this.props.email.includes('@')) {
      throw new Error('유효하지 않은 이메일 형식입니다.');
    }

    if (!this.props.role) {
      throw new Error('role은 필수입니다.');
    }
    if (!Object.values(Role).includes(this.props.role)) {
      throw new Error('유효하지 않은 role입니다.');
    }
  }

  get email(): string {
    return this.props.email;
  }

  get role(): Role {
    return this.props.role;
  }
}
