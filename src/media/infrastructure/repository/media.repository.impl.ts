import { EntityRepository } from '@mikro-orm/mysql';
import { Media } from 'src/media/domain/entity/media';

export class MediaRepositoryImpl extends EntityRepository<Media> {
  async save(media: Media): Promise<void> {
    await this.em.persistAndFlush(media);
  }
}
