import { Entity, ManyToOne, Property } from '@mikro-orm/core';
import { ArticleEntity } from 'src/article/command/infrastructure/article.entity';
import { BaseEntity } from 'src/shared/infrastructure/orm-entity/base.entity';

@Entity({ tableName: 'media' })
export class MediaEntity extends BaseEntity {
  @Property({ type: 'varchar' })
  mediaPath: string;

  @Property({ type: 'boolean' })
  isThumbnail: boolean;

  @ManyToOne(() => ArticleEntity, { nullable: false, eager: false })
  article: ArticleEntity;
}
