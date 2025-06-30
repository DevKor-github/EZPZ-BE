import { Cascade, Collection, Entity, ManyToMany, OneToMany, OneToOne, Property } from '@mikro-orm/core';
import { MediaEntity } from 'src/media/command/infrastructure/media.entity';
import { BaseEntity } from 'src/shared/infrastructure/orm-entity/base.entity';
import { TagEntity } from 'src/tag/infrastructure/orm-entity/tag.entity';

@Entity({ tableName: 'article' })
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

  @OneToOne(() => MediaEntity, { nullable: true })
  thumbnail: MediaEntity;

  @OneToMany(() => MediaEntity, (media) => media.article, { nullable: true, cascade: [Cascade.ALL] })
  media = new Collection<MediaEntity>(this);

  @ManyToMany(() => TagEntity, (tag) => tag.articles, { owner: true })
  tags = new Collection<TagEntity>(this);
}
