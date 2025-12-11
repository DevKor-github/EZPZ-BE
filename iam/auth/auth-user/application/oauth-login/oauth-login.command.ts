import { OAuthProviderType } from '../../domain/value-object/oauth-provider.enum';

export class OAuthLoginCommand {
  constructor(
    public readonly oAuthProviderType: OAuthProviderType,
    public readonly code: string,
    public readonly state?: string,
  ) {}
}
