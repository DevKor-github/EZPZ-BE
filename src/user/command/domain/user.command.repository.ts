import { User } from './user';

export interface UserCommandRepository {
  save(user: User): Promise<void>;
  findById(userId: string): Promise<User | null>;
  deleteById(userId: string): Promise<void>;
}

export const USER_COMMAND_REPOSITORY = Symbol('USER_COMMAND_REPOSITORY');
