import { MediaEntity } from 'src/media/infrastructure/orm-entity/media.entity';

export interface MediaRepository {
  save(MediaEntity: MediaEntity): Promise<void>;
}
