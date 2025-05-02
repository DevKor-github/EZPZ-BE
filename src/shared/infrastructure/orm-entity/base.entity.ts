import { Property } from '@mikro-orm/core';

export class BaseEntity {
  @Property()
  createdAt = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt = new Date();
}
