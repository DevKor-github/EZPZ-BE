import { EntityManager, EntityRepository } from '@mikro-orm/mysql';
import { Tag } from 'src/tag/domain/entity/tag';
import { TagRepository } from 'src/tag/domain/repository/tag.repository';
import { TagMapper } from '../mapper/tag.mapper';
import { TagEntity } from '../orm-entity/tag.entity';
import { InjectRepository } from '@mikro-orm/nestjs';

export class TagRepositoryImpl implements TagRepository {
  constructor(
    @InjectRepository(TagEntity)
    private readonly tagOrmRepository: EntityRepository<TagEntity>,
    private readonly em: EntityManager,
  ) {}

  async save(tag: Tag): Promise<void> {
    const tagEntity = TagMapper.toEntity(tag);
    await this.em.persistAndFlush(tagEntity);
  }

  async findByName(name: string): Promise<Tag | null> {
    const tagEntity = await this.tagOrmRepository.findOne({ name }, { populate: ['articles'] });
    console.log('TagRepository findByName result:', {
      searchName: name,
      found: !!tagEntity,
      entityData: tagEntity
        ? {
            id: tagEntity.id,
            name: tagEntity.name,
          }
        : null,
    });
    return tagEntity ? TagMapper.toDomain(tagEntity) : null;
  }
}
