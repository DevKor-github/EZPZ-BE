import { Injectable } from '@nestjs/common';
import { OAuthProviderFactory } from 'src/auth/infrastructure/oauth/oauth-provider.factory';

@Injectable()
export class AuthorizeOAuthUseCase {
  constructor(private readonly oAuthProviderFactory: OAuthProviderFactory) {}

  execute(providerName: string): string {
    const provider = this.oAuthProviderFactory.getProvider(providerName);
    const authUrl = provider.getAuthorizationUrl();

    return authUrl;
  }
}
