import { UserScrap } from '../entity/user-scrap';

export interface UserScrapRepository {
  save(userScrap: UserScrap): Promise<void>;
}
