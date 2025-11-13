import { OAuthProviderType } from 'src/auth/auth-user/domain/value-object/oauth-provider.enum';

export interface BaseOAuthProvider {
  getToken(code: string): Promise<string>;
  getUserInfo(token: string): Promise<OAuthUser>;
  getAuthorizationUrl(state?: string): string;
  unlinkAccount(oAuthId: string): Promise<void>;
}

export interface OAuthUser {
  oauthId: string;
  provider: OAuthProviderType;
  email: string;
}
