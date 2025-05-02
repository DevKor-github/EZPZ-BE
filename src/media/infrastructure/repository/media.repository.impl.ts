import { EntityRepository } from '@mikro-orm/mysql';
import { Media } from 'src/media/domain/entity/media';
import { MediaRepository } from 'src/media/domain/repository/media.repository';
import { MediaMapper } from '../mapper/media.mapper';

export class MediaRepositoryImpl extends EntityRepository<Media> implements MediaRepository {
  async save(media: Media): Promise<void> {
    const mediaEntity = MediaMapper.toEntity(media);
    await this.em.persistAndFlush(mediaEntity);
  }
}
