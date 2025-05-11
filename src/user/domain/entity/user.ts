import { Role } from 'src/user/domain/value-object/role.enum';
import { BaseDomainEntity, BaseEntityProps } from 'src/shared/domain/entity/base.entity';
import { Identifier } from 'src/shared/domain/value-object/identifier';

export interface UserProps extends BaseEntityProps {
  oauthId: string;
  email: string;
  role: Role;
  scrapIds: Identifier[];
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

  get scrapIds(): Identifier[] | undefined {
    return this.props.scrapIds;
  }
}
