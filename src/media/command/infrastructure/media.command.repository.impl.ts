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

  async saveAll(mediaList: Media[]): Promise<void> {
    const mediaEntites = mediaList.map((media) => MediaMapper.toEntity(media, this.em));
    await this.em.persistAndFlush(mediaEntites);
  }

  async deleteByIds(mediaIds: string[]): Promise<void> {
    if (mediaIds.length === 0) return;

    await this.ormRepository.nativeDelete({ id: mediaIds });
  }

  async findByArticleId(articleId: string): Promise<Media[]> {
    const mediaEntities = await this.ormRepository.find({ article: articleId }, { orderBy: { order: 'ASC' } });

    return mediaEntities.map((mediaEntity) => MediaMapper.toDomain(mediaEntity));
  }

  async updateAll(mediaList: Media[]): Promise<void> {
    const mediaEntites = mediaList.map((media) => MediaMapper.toEntity(media, this.em));
    await this.em.upsertMany(mediaEntites);
  }
}
