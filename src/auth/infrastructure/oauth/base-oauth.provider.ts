export interface BaseOAuthProvider {
  getToken(code: string): Promise<string>;
  getUserInfo(token: string): Promise<OAuthUser>;
  getAuthorizationUrl(): string;
}

export interface OAuthUser {
  id: string;
  email?: string;
}
