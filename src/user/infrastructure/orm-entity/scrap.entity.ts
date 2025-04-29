import { Entity, ManyToOne, PrimaryKey } from '@mikro-orm/core';
import { ArticleEntity } from 'src/article/infrastructure/orm-entity/article.entity';
import { BaseEntity } from 'src/shared/infrastructure/orm-entity/base.entity';
import { UserEntity } from './user.entity';

@Entity({ tableName: 'scrap' })
export class ScrapEntity extends BaseEntity {
  @PrimaryKey()
  id: number;

  @ManyToOne(() => ArticleEntity)
  article: ArticleEntity;

  @ManyToOne(() => UserEntity)
  user: UserEntity;
}
