import { EntityRepository } from '@mikro-orm/mysql';
import { Media } from 'src/media/domain/entity/media';
import { MediaEntity } from '../orm-entity/media.entity';

export class MediaRepositoryImpl extends EntityRepository<Media> {
  async save(mediaEntity: MediaEntity): Promise<void> {
    await this.em.persistAndFlush(mediaEntity);
  }
}
