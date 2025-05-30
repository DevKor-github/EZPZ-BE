import { Cascade, Collection, Entity, ManyToMany, OneToMany, Property } from '@mikro-orm/core';
import { MediaEntity } from 'src/media/infrastructure/orm-entity/media.entity';
import { BaseEntity } from 'src/shared/infrastructure/orm-entity/base.entity';
import { TagEntity } from 'src/tag/infrastructure/orm-entity/tag.entity';
import { ArticleRepositoryImpl } from '../repository/article.repository.impl';

@Entity({ tableName: 'article', repository: () => ArticleRepositoryImpl })
export class ArticleEntity extends BaseEntity {
  @Property({ type: 'varchar' })
  title: string;

  @Property({ type: 'varchar' })
  organization: string;

  @Property({ type: 'varchar' })
  location: string;

  @Property({ type: 'varchar' })
  description: string;

  @Property({ type: 'varchar' })
  registrationUrl: string;

  @Property({ type: 'datetime' })
  startAt: Date;

  @Property({ type: 'datetime' })
  endAt: Date;

  @Property({ type: 'int' })
  scrapCount: number;

  @Property({ type: 'int' })
  viewCount: number;

  @OneToMany(() => MediaEntity, (media) => media.article, { nullable: true, cascade: [Cascade.ALL] })
  media = new Collection<MediaEntity>(this);

  @ManyToMany(() => TagEntity, (tag) => tag.articles, { owner: true })
  tags = new Collection<TagEntity>(this);
}
