import { MikroORM, EntityManager } from '@mikro-orm/core';
import mikroOrmConfig from 'src/shared/config/mikro-orm.config';
import { Role } from '../../../auth/domain/value-object/role.enum';
import { UserEntity } from '../../../user/infrastructure/orm-entity/user.entity';
import { AuthEntity } from '../../../auth/infrastructure/orm-entity/auth.entity';
import { UserMapper } from 'src/user/infrastructure/mapper/user.mapper';
import { User } from 'src/user/domain/entity/user';

describe('UserEntity MikroORM Integration', () => {
  let orm: MikroORM;
  let em: EntityManager;

  beforeAll(async () => {
    orm = await MikroORM.init({
      ...mikroOrmConfig,
      entities: [UserEntity, AuthEntity], // Ensure UserEntity is included
    });
    em = orm.em.fork();
    await orm.getSchemaGenerator().refreshDatabase(); // Drops + recreates tables
  });

  afterAll(async () => {
    await orm.close(); // Ensures clean shutdown
  });

  it('should persist and retrieve a user entity without error', async () => {
    // Create user entity with necessary properties
    const user = User.create({
      id: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      oauthId: 'test-oauth-id',
      email: 'aaa@aaa.com',
      role: Role.GENERAL,
      scrapIds: [1, 2, 3], // Assuming these are valid IDs in your context
    });

    const userEntity = UserMapper.toEntity(user); // Convert to entity

    // Persist entity
    await em.persistAndFlush(userEntity);

    // Retrieve entity
    const found = await em.findOne(UserEntity, { id: user.id });

    const userCheck = UserMapper.toDomain(found!);

    console.log('User Check:', userCheck); // Log the userCheck object

    // Assertions with clear expectations
    expect(found).toBeDefined();
    expect(found?.email).toBe(user.email);
    // expect(found?.scrapIds).toEqual([1, 2, 3]);
  });
});
