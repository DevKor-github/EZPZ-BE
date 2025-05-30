import { Entity, ManyToOne } from '@mikro-orm/core';
import { ArticleEntity } from 'src/article/infrastructure/orm-entity/article.entity';
import { BaseEntity } from 'src/shared/infrastructure/orm-entity/base.entity';
import { UserEntity } from '../../../user/infrastructure/orm-entity/user.entity';
import { ScrapRepositoryImpl } from '../repository/scrap.repository.impl';

@Entity({ tableName: 'scrap', repository: () => ScrapRepositoryImpl })
export class ScrapEntity extends BaseEntity {
  @ManyToOne(() => ArticleEntity)
  article: ArticleEntity;

  @ManyToOne(() => UserEntity)
  user: UserEntity;
}
