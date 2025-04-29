import { Entity, ManyToMany, OneToMany, PrimaryKey, Property } from '@mikro-orm/core';
import { MediaEntity } from 'src/media/infrastructure/orm-entity/media.entity';
import { BaseEntity } from 'src/shared/infrastructure/orm-entity/base.entity';
import { TagEntity } from 'src/tag/infrastructure/orm-entity/tag.entity';
import { ScrapEntity } from 'src/user/infrastructure/orm-entity/scrap.entity';

@Entity({ tableName: 'article' })
export class ArticleEntity extends BaseEntity {
  @PrimaryKey()
  id: number;

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

  @OneToMany(() => ScrapEntity, (scrap) => scrap.article, { nullable: true })
  scraps: ScrapEntity[];

  @OneToMany(() => MediaEntity, (media) => media.article, { nullable: true })
  media: MediaEntity[];

  @ManyToMany(() => TagEntity)
  tags: TagEntity[];
}
