import { InjectRepository } from '@mikro-orm/nestjs';
import { Media } from '../domain/media';
import { MediaCommandRepository } from '../domain/media.command.repository';
import { MediaEntity } from './media.entity';
import { EntityManager, EntityRepository } from '@mikro-orm/mysql';
import { MediaMapper } from './media.mapper';

export class MediaCommandRepositoryImpl implements MediaCommandRepository {
  constructor(
    @InjectRepository(MediaEntity)
    private readonly ormRepository: EntityRepository<MediaEntity>,
    private readonly em: EntityManager,
  ) {}

  async save(media: Media): Promise<void> {
    const mediaEntity = MediaMapper.toEntity(media, this.em);
    await this.em.persistAndFlush(mediaEntity);
  }

  async saveAll(meidaList: Media[]): Promise<void> {
    const mediaEntites = meidaList.map((media) => MediaMapper.toEntity(media, this.em));
    await this.em.persistAndFlush(mediaEntites);
  }
}
