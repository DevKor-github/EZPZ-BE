import { OAuthProviderType } from 'src/auth/domain/value-object/oauth-provider.enum';

export interface BaseOAuthProvider {
  getToken(code: string): Promise<string>;
  getUserInfo(token: string): Promise<OAuthUser>;
  getAuthorizationUrl(): string;
}

export interface OAuthUser {
  oauthId: string;
  provider: OAuthProviderType;
  email: string;
}
