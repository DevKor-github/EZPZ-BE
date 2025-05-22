import { Entity, ManyToOne, Property } from '@mikro-orm/core';
import { ArticleEntity } from 'src/article/infrastructure/orm-entity/article.entity';
import { BaseEntity } from 'src/shared/infrastructure/orm-entity/base.entity';
import { MediaRepositoryImpl } from '../repository/media.repository.impl';

@Entity({ tableName: 'media', repository: () => MediaRepositoryImpl })
export class MediaEntity extends BaseEntity {
  @Property({ type: 'varchar' })
  mediaPath: string;

  @Property({ type: 'boolean' })
  isThumbnail: boolean;

  @ManyToOne(() => ArticleEntity, { nullable: false, eager: false })
  article: ArticleEntity;
}
