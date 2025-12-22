import { Entity, Property } from '@mikro-orm/core';

@Entity({
  expression: `
    SELECT
      a.id,
      a.organization_id,
      a.title,
      a.organization,
      a.description,
      a.location,
      m.media_path AS thumbnail_path,
      a.scrap_count,
      a.view_count,
      a.start_at,
      a.end_at,
      tags.tags,
      a.registration_start_at,
      a.registration_end_at,
      a.created_at
    FROM article a
    LEFT JOIN media m ON m.article_id = a.id AND m.order = 0
    LEFT JOIN (
      SELECT
        at.article_entity_id,
        GROUP_CONCAT(DISTINCT t.name ORDER BY t.name ASC SEPARATOR ',') AS tags
      FROM article_tags at
      JOIN tag t ON t.id = at.tag_entity_id
      GROUP BY at.article_entity_id
    ) tags ON tags.article_entity_id = a.id
  `,
})
export class ArticleViewEntity {
  @Property()
  id: string;

  @Property()
  organizationId: string;

  @Property()
  title: string;

  @Property()
  organization: string;

  @Property()
  description: string;

  @Property()
  location: string;

  @Property()
  scrapCount: number;

  @Property()
  viewCount: number;

  @Property()
  startAt: Date;

  @Property()
  endAt: Date;

  @Property()
  createdAt: Date;

  @Property()
  thumbnailPath: string;

  @Property()
  tags: string;

  @Property()
  registrationStartAt?: Date;

  @Property()
  registrationEndAt?: Date;
}
