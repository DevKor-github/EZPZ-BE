import { Entity, ManyToMany, PrimaryKey, Property } from '@mikro-orm/core';
import { ArticleEntity } from 'src/article/infrastructure/orm-entity/article.entity';
import { BaseEntity } from 'src/shared/infrastructure/orm-entity/base.entity';
import { TagRepositoryImpl } from '../repository/tag.repository.impl';

@Entity({ tableName: 'tag', repository: () => TagRepositoryImpl })
export class TagEntity extends BaseEntity {
  @PrimaryKey()
  id: number;

  @Property({ type: 'varchar' })
  name: string;

  @ManyToMany(() => ArticleEntity, (article) => article.tags, { nullable: true })
  articles: ArticleEntity[];
}
