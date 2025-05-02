import { Auth } from '../entity/auth';

export interface AuthRepository {
  save(auth: Auth): Promise<void>;
}
