import { Admin } from './admin';

export interface AdminRepository {
  save(admin: Admin): Promise<void>;
  loadById(id: string): Promise<Admin>;
}

export const ADMIN_REPOSITORY = Symbol('ADMIN_REPOSITORY');
