import { Entity, ManyToOne, Unique } from '@mikro-orm/core';
import { ArticleEntity } from 'src/article/command/infrastructure/article.entity';
import { BaseEntity } from 'src/shared/core/infrastructure/orm-entity/base.entity';
import { UserEntity } from 'src/user/command/infrastructure/user.entity';

@Entity({ tableName: 'scrap' })
@Unique({ properties: ['article', 'user'] })
export class ScrapEntity extends BaseEntity {
  @ManyToOne(() => ArticleEntity, { deleteRule: 'cascade' })
  article: ArticleEntity;

  @ManyToOne(() => UserEntity, { deleteRule: 'cascade' })
  user: UserEntity;
}
