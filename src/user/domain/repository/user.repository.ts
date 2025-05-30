import { User } from '../entity/user';

export interface UserRepository {
  save(user: User): Promise<void>;
  findById(userId: string): Promise<User | null>;
  deleteById(userId: string): Promise<void>;
}

export const USER_REPOSITORY = Symbol('USER_REPOSITORY');
