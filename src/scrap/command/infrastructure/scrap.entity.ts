import { Entity, ManyToOne, Unique } from '@mikro-orm/core';
import { ArticleEntity } from 'src/article/infrastructure/orm-entity/article.entity';
import { BaseEntity } from 'src/shared/infrastructure/orm-entity/base.entity';
import { UserEntity } from 'src/user/infrastructure/orm-entity/user.entity';

@Entity({ tableName: 'scrap' })
@Unique({ properties: ['article', 'user'] })
export class ScrapEntity extends BaseEntity {
  @ManyToOne(() => ArticleEntity, { deleteRule: 'cascade' })
  article: ArticleEntity;

  @ManyToOne(() => UserEntity, { deleteRule: 'cascade' })
  user: UserEntity;
}
