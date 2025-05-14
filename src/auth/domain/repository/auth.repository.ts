import { Auth } from '../entity/auth';

export interface AuthRepository {
  save(auth: Auth): Promise<void>;
  update(auth: Auth): Promise<void>;
  findByOAuthIdandProvider(oauthId: string, provider: string): Promise<Auth | null>;
  findByRefreshToken(refreshToken: string): Promise<Auth | null>;
  findByUserId(userId: string): Promise<Auth | null>;
}

export const AUTH_REPOSITORY = Symbol('AUTH_REPOSITORY');
