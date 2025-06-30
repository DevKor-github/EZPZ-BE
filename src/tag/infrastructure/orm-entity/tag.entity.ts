import { Collection, Entity, ManyToMany, Property } from '@mikro-orm/core';
import { ArticleEntity } from 'src/article/command/infrastructure/article.entity';
import { BaseEntity } from 'src/shared/infrastructure/orm-entity/base.entity';

@Entity({ tableName: 'tag' })
export class TagEntity extends BaseEntity {
  @Property({ type: 'varchar' })
  name: string;

  @ManyToMany(() => ArticleEntity, (article) => article.tags, { nullable: true })
  articles = new Collection<ArticleEntity>(this);
}
