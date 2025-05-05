import { User } from '../entity/user';

export interface UserRepository {
  save(user: User): Promise<void>;
}

export const USER_REPOSITORY = Symbol('USER_REPOSITORY');
