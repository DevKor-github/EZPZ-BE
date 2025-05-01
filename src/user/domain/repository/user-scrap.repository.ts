import { ScrapEntity } from 'src/user/infrastructure/orm-entity/scrap.entity';

export interface UserScrapRepository {
  save(scrapEntity: ScrapEntity): Promise<void>;
}
