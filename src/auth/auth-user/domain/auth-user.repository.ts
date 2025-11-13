import { AuthUser } from './auth-user';

export interface AuthUserRepository {
  save(authUser: AuthUser): Promise<void>;
  update(authUser: AuthUser): Promise<void>;
  findByOAuthIdandProvider(oauthId: string, provider: string): Promise<AuthUser | null>;
  findByRefreshToken(refreshToken: string): Promise<AuthUser | null>;
  findByUserId(userId: string): Promise<AuthUser | null>;
  deleteById(id: string): Promise<void>;
}

export const AUTH_USER_REPOSITORY = Symbol('AUTH_USER_REPOSITORY');
