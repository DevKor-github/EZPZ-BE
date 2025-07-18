export interface BaseMapper<DomainEntity, OrmEntity> {
  toDomain(entity: OrmEntity): DomainEntity;
  toEntity(domain: DomainEntity): OrmEntity;
}

export function createMapper<Domain, Orm>(
  toDomain: (entity: Orm) => Domain,
  toEntity: (domain: Domain) => Orm,
): BaseMapper<Domain, Orm> {
  return {
    toDomain: toDomain,
    toEntity: toEntity,
  };
}
