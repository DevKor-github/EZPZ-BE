import { Entity, ManyToOne, Unique } from '@mikro-orm/core';
import { UserEntity } from 'iam/user/infrastructure/user.entity';
import { ArticleEntity } from 'src/article/command/infrastructure/article.entity';
import { BaseEntity } from 'src/shared/core/infrastructure/orm-entity/base.entity';

@Entity({ tableName: 'scrap' })
@Unique({ properties: ['article', 'user'] })
export class ScrapEntity extends BaseEntity {
  @ManyToOne(() => ArticleEntity, { deleteRule: 'cascade' })
  article: ArticleEntity;

  @ManyToOne(() => UserEntity, { deleteRule: 'cascade' })
  user: UserEntity;
}
