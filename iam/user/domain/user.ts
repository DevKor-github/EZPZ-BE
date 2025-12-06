import { BaseEntityProps } from 'src/shared/core/domain/base.entity';
import { CustomException } from 'src/shared/exception/custom-exception';
import { CustomExceptionCode } from 'src/shared/exception/custom-exception-code';
import { AggregateRoot } from 'src/shared/core/domain/base.aggregate';
import { UserDeletedEvent } from './event/user-deleted.event';

export interface UserProps extends BaseEntityProps {
  email: string;
}

export class User extends AggregateRoot<UserProps> {
  protected constructor(props: UserProps) {
    super(props);
  }

  public static create(props: UserProps): User {
    const user = new User(props);
    user.validate();

    return user;
  }

  delete(): void {
    this.addDomainEvent(new UserDeletedEvent(this.id.value));
  }

  public validate(): void {
    if (!this.props.email) {
      throw new CustomException(CustomExceptionCode.USER_EMAIL_EMPTY);
    }
    if (!this.props.email || !this.props.email.includes('@')) {
      throw new CustomException(CustomExceptionCode.USER_INVALID_EMAIL_FORMAT);
    }
  }

  get email(): string {
    return this.props.email;
  }
}
