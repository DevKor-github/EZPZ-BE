import { AggregateRoot } from 'src/shared/core/domain/base.aggregate';
import { BaseEntityProps } from 'src/shared/core/domain/base.entity';
import { Identifier } from 'src/shared/core/domain/identifier';
import { AccountId } from './vo/account-id';
import { PasswordHash } from './vo/password-hash';

export interface AuthOrganizationProps extends BaseEntityProps {
  accountId: AccountId;
  passwordHash: PasswordHash;
  refreshToken: string | null;
  organizationId: Identifier;
  isDeleted: boolean;
  deletedAt: Date | null;
}

export class AuthOrganization extends AggregateRoot<AuthOrganizationProps> {
  constructor(props: AuthOrganizationProps) {
    super(props);
  }

  public static create(props: AuthOrganizationProps): AuthOrganization {
    const authOrganization = new AuthOrganization(props);
    authOrganization.validate();

    return authOrganization;
  }

  public static of(props: AuthOrganizationProps): AuthOrganization {
    return new AuthOrganization(props);
  }

  public validate(): void {}

  update(
    accountId: AccountId | null,
    passwordHash: PasswordHash | null,
    refreshToken: string | null,
    organizationId: Identifier | null,
  ) {
    if (accountId) this.props.accountId = accountId;
    if (passwordHash) this.props.passwordHash = passwordHash;
    if (refreshToken) this.props.refreshToken = refreshToken;
    if (organizationId) this.props.organizationId = organizationId;
    this.props.updatedAt = new Date();

    this.validate();
  }

  updateRefreshToken(refreshToken: string | null) {
    this.props.refreshToken = refreshToken;
    this.props.updatedAt = new Date();
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

  get refreshToken(): string | null {
    return this.props.refreshToken;
  }

  get organizationId(): Identifier {
    return this.props.organizationId;
  }

  get isDeleted(): boolean {
    return this.props.isDeleted;
  }

  get deletedAt(): Date | null {
    return this.props.deletedAt;
  }
}
