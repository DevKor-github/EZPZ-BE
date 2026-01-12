import { AggregateRoot } from 'src/shared/core/domain/base.aggregate';
import { BaseEntityProps } from 'src/shared/core/domain/base.entity';
import { CustomException } from 'src/shared/exception/custom-exception';
import { CustomExceptionCode } from 'src/shared/exception/custom-exception-code';

export interface AdminProps extends BaseEntityProps {
  name: string;
}

export class Admin extends AggregateRoot<AdminProps> {
  protected constructor(props: AdminProps) {
    super(props);
  }

  public static create(props: AdminProps): Admin {
    const admin = new Admin(props);
    admin.validate();

    return admin;
  }

  public static of(props: AdminProps): Admin {
    return new Admin(props);
  }

  public validate(): void {
    if (this.props.name.length < 1 || this.props.name.length > 20) {
      throw new CustomException(CustomExceptionCode.ADMIN_INVALID_NAME_LENGTH);
    }
  }

  get name(): string {
    return this.props.name;
  }
}
