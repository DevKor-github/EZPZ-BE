import { OAuthProviderType } from '../../domain/value-object/oauth-provider.enum';

export class UnlinkOAuthCommand {
  constructor(
    public readonly oAuthProviderType: OAuthProviderType,
    public readonly userId: string,
  ) {}
}
