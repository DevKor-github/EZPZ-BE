import { AuthOrganization } from './auth-organization';

export interface AuthOrganizationStore {
  save(authOrganization: AuthOrganization): Promise<void>;
  update(authOrganization: AuthOrganization): Promise<void>;
  loadByOrganizationId(organizationId: string): Promise<AuthOrganization | null>;
  loadByRefreshToken(refreshToken: string): Promise<AuthOrganization | null>;
  loadByAccountId(accountId: string): Promise<AuthOrganization | null>;
  existsByAccountId(accountId: string): Promise<boolean>;
  deleteById(organizationId: string): Promise<void>;
}

export const AUTH_ORGANIZATION_STORE = Symbol('AUTH_ORGANIZATION_STORE');
