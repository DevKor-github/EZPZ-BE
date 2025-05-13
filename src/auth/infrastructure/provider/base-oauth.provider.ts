export interface BaseOAuthProvider {
  getToken(code: string): Promise<string>;
  getUserInfo(token: string): Promise<OAuthUser>;
  getAuthorizationUrl(): string;
}

export interface OAuthUser {
  oauthId: string;
  provider: string;
  email: string;
}
