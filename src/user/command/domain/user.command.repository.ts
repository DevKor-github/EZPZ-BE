import { User } from './user';

export interface UserCommandRepository {
  save(user: User): Promise<void>;
  deleteById(userId: string): Promise<void>;
}

export const USER_COMMAND_REPOSITORY = Symbol('USER_COMMAND_REPOSITORY');
