import { BaseDomainEvent } from 'src/shared/core/domain/base.domain-event';
import { Identifier } from 'src/shared/core/domain/identifier';
import { OAuthProviderType } from '../value-object/oauth-provider.enum';

export class LoginSucceededEvent implements BaseDomainEvent {
  readonly timestamp: Date;

  constructor(
    public readonly userId: Identifier,
    public readonly provider: OAuthProviderType,
  ) {
    this.timestamp = new Date();
  }
}
