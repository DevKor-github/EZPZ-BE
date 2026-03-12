import { AuthAdmin } from './auth-admin';

export interface AuthAdminRepository {
  save(authAdmin: AuthAdmin): Promise<void>;
  loadById(id: string): Promise<AuthAdmin>;
  loadByAccountId(accountId: string): Promise<AuthAdmin | null>;
}

export const AUTH_ADMIN_REPOSITORY = Symbol('AUTH_ADMIN_REPOSITORY');
