import { User } from './user';

export interface UserStore {
  save(user: User): Promise<void>;
  findById(userId: string): Promise<User | null>;
  deleteById(userId: string): Promise<void>;
}

export const USER_STORE = Symbol('USER_STORE');
