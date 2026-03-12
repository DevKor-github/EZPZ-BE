import { UserAdminView } from './user.admin.view';
import { UserView } from './user.view';

export interface UserReader {
  findById(userId: string): Promise<UserView>;
  findAllByCursor(pageSize: number, cursorId?: string, cursorDate?: Date): Promise<UserAdminView[]>;
}

export const USER_READER = Symbol('USER_READER');
