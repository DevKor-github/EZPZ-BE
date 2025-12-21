import { Entity, Property } from '@mikro-orm/core';

@Entity({
  expression: `
    SELECT
      o.id,
      o.name,
      o.contact,
      o.created_at AS createdAt
    FROM
      organization o
  `,
})
export class OrganizationViewEntity {
  @Property()
  id: string;

  @Property()
  name: string;

  @Property()
  contact: string;

  @Property()
  createdAt: Date;
}
