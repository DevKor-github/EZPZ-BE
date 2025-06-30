import { EntityManager, EntityRepository } from '@mikro-orm/mysql';
import { Media } from 'src/media/domain/entity/media';
import { MediaRepository } from 'src/media/domain/repository/media.repository';
import { MediaMapper } from '../mapper/media.mapper';
import { MediaEntity } from '../orm-entity/media.entity';
import { InjectRepository } from '@mikro-orm/nestjs';

export class MediaRepositoryImpl implements MediaRepository {
  constructor(
    @InjectRepository(MediaEntity)
    private readonly mediaOrmRepository: EntityRepository<MediaEntity>,
    private readonly em: EntityManager,
  ) {}

  async save(media: Media): Promise<void> {
    const mediaEntity = MediaMapper.toEntity(media);
    await this.em.persistAndFlush(mediaEntity);
  }

  async saveAll(meidaList: Media[]): Promise<void> {
    const mediaEntites = meidaList.map((media) => MediaMapper.toEntity(media));
    await this.em.persistAndFlush(mediaEntites);
  }

  async findById(id: string): Promise<Media | null> {
    const mediaEntity = await this.mediaOrmRepository.findOne({ id });
    if (!mediaEntity) {
      return null;
    }
    return MediaMapper.toDomain(mediaEntity);
  }
}
