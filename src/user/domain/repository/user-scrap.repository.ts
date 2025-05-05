import { UserScrap } from '../entity/user-scrap';

export interface UserScrapRepository {
  save(userScrap: UserScrap): Promise<void>;
}

export const USER_SCRAP_REPOSITORY = Symbol('USER_SCRAP_REPOSITORY');
