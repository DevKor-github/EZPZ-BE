import { BaseDomainEvent } from 'src/shared/core/domain/base.domain-event';
import { Identifier } from 'src/shared/core/domain/identifier';
import { Role } from 'src/user/command/domain/value-object/role.enum';
import { OAuthProviderType } from '../value-object/oauth-provider.enum';

export class AuthCreatedEvent implements BaseDomainEvent {
  readonly timesstamp: Date;

  constructor(
    public readonly userId: Identifier,
    public readonly email: string,
    public readonly role: Role,
    public readonly provider: OAuthProviderType,
  ) {
    this.timesstamp = new Date();
  }
}
