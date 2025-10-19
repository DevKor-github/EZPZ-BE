import { OAuthProviderType } from 'src/auth/domain/value-object/oauth-provider.enum';

export interface BaseOAuthProvider {
  getToken(code: string): Promise<string>;
  getUserInfo(token: string): Promise<OAuthUser>;
  getAuthorizationUrl(state?: string): string;
  unlinkAccount(userId: string): Promise<void>;
}

export interface OAuthUser {
  oauthId: string;
  provider: OAuthProviderType;
  email: string;
}
