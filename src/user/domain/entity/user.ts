import { Role } from 'src/auth/domain/value-object/role.enum';
import { BaseDomainEntity, BaseEntityProps } from 'src/shared/domain/base/base.entity';

export interface UserProps extends BaseEntityProps {
  oauthId: string;
  email: string;
  role: Role;
  authId: number;
  scrapIds: number[];
}
export class User extends BaseDomainEntity<UserProps> {
  protected constructor(props: UserProps) {
    super(props);
  }

  public static create(props: UserProps): User {
    return new User(props);
  }

  get oauthId(): string {
    return this.props.oauthId;
  }

  get email(): string {
    return this.props.email;
  }

  get role(): Role {
    return this.props.role;
  }

  get authId(): number {
    return this.props.authId;
  }

  get scrapIds(): number[] | undefined {
    return this.props.scrapIds;
  }
}
