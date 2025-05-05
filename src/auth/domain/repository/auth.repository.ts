import { Auth } from '../entity/auth';

export interface AuthRepository {
  save(auth: Auth): Promise<void>;
}

export const AUTH_REPOSITORY = Symbol('AUTH_REPOSITORY');
