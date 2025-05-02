import { User } from '../entity/user';

export interface UserRepository {
  save(user: User): Promise<void>;
}
