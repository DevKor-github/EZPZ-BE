import { Injectable } from '@nestjs/common';
import { AuthorizeOAuthCommand } from './authorize-oauth.command';
import { AuthorizeOAuthResult } from './authorize-oauth.result';
import { OAuthProviderFactory } from 'iam/auth/auth-core/infrastructure/oauth/oauth-provider.factory';

@Injectable()
export class AuthorizeOAuthUseCase {
  constructor(private readonly oAuthProviderFactory: OAuthProviderFactory) {}

  execute(command: AuthorizeOAuthCommand): AuthorizeOAuthResult {
    const { oAuthProviderType, redirectUrl } = command;
    const provider = this.oAuthProviderFactory.getProvider(oAuthProviderType);

    const encodedState = encodeURIComponent(redirectUrl || '');

    const authUrl = provider.getAuthorizationUrl(encodedState);

    return { authUrl };
  }
}
