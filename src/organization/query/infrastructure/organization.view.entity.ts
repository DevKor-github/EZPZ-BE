import { Entity, Property } from '@mikro-orm/core';

@Entity({
  expression: `
    SELECT
      o.id,
      o.name,
      o.contact
    FROM
      organizations o
  `,
})
export class OrganizationViewEntity {
  @Property()
  id: string;

  @Property()
  name: string;

  @Property()
  contact: string;
}
