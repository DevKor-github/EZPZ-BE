import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { ArticleEntity } from 'src/article/infrastructure/orm-entity/article.entity';
import { BaseEntity } from 'src/shared/infrastructure/orm-entity/base.entity';

@Entity({ tableName: 'media' })
export class MediaEntity extends BaseEntity {
  @PrimaryKey()
  id: number;

  @Property({ type: 'varchar' })
  mediaPath: string;

  @Property({ type: 'boolean' })
  isThumbnail: boolean;

  @ManyToOne(() => ArticleEntity, { nullable: true })
  article: ArticleEntity;
}
