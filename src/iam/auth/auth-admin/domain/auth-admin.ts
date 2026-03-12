import { PasswordHash } from 'src/iam/auth/auth-core/domain/value-object/password-hash';
import { AccountId } from 'src/iam/auth/auth-organization/domain/vo/account-id';
import { AggregateRoot } from 'src/shared/core/domain/base.aggregate';
import { BaseEntityProps } from 'src/shared/core/domain/base.entity';
import { Identifier } from 'src/shared/core/domain/identifier';

export interface AuthAdminProps extends BaseEntityProps {
  accountId: AccountId;
  passwordHash: PasswordHash;
  adminId: Identifier;
  isDeleted: boolean;
  deletedAt: Date | null;
}

export class AuthAdmin extends AggregateRoot<AuthAdminProps> {
  constructor(props: AuthAdminProps) {
    super(props);
  }

  public static create(props: AuthAdminProps): AuthAdmin {
    const authAdmin = new AuthAdmin(props);
    authAdmin.validate();

    return authAdmin;
  }

  public static of(props: AuthAdminProps): AuthAdmin {
    return new AuthAdmin(props);
  }

  public validate(): void {}

  update(accountId: AccountId | null, passwordHash: PasswordHash | null, adminId: Identifier | null) {
    if (accountId) this.props.accountId = accountId;
    if (passwordHash) this.props.passwordHash = passwordHash;
    if (adminId) this.props.adminId = adminId;
    this.props.updatedAt = new Date();

    this.validate();
  }

  delete() {
    this.props.isDeleted = true;
    this.props.deletedAt = new Date();
  }

  unDelete() {
    this.props.isDeleted = false;
    this.props.deletedAt = null;
  }

  get accountId(): AccountId {
    return this.props.accountId;
  }

  get passwordHash(): PasswordHash {
    return this.props.passwordHash;
  }

  get adminId(): Identifier {
    return this.props.adminId;
  }

  get isDeleted(): boolean {
    return this.props.isDeleted;
  }

  get deletedAt(): Date | null {
    return this.props.deletedAt;
  }
}
