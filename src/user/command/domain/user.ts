import { BaseDomainEntity, BaseEntityProps } from 'src/shared/core/domain/base.entity';
import { Role } from './value-object/role.enum';
import { CustomException } from 'src/shared/exception/custom-exception';
import { CustomExceptionCode } from 'src/shared/exception/custom-exception-code';

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
      throw new CustomException(CustomExceptionCode.USER_EMAIL_EMPTY);
    }
    if (!this.props.email || !this.props.email.includes('@')) {
      throw new CustomException(CustomExceptionCode.USER_INVALID_EMAIL_FORMAT);
    }

    if (!this.props.role) {
      throw new CustomException(CustomExceptionCode.USER_ROLE_EMPTY);
    }
    if (!Object.values(Role).includes(this.props.role)) {
      throw new CustomException(CustomExceptionCode.USER_INVALID_ROLE);
    }
  }

  get email(): string {
    return this.props.email;
  }

  get role(): Role {
    return this.props.role;
  }
}
