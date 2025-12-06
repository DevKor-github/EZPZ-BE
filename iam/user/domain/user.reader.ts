import { UserView } from './user.view';

export interface UserReader {
  findById(userId: string): Promise<UserView>;
}

export const USER_READER = Symbol('USER_READER');
