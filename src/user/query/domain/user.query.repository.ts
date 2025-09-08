import { UserModel } from './user.model';

export interface UserQueryRepository {
  findById(userId: string): Promise<UserModel>;
}

export const USER_QUERY_REPOSITORY = Symbol('USER_QUERY_REPOSITORY');
