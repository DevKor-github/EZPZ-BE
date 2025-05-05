import { Module } from '@nestjs/common';
import { UserRepositoryImpl } from './infrastructure/repository/user.repository.impl';
import { UserScrapRepositoryImpl } from './infrastructure/repository/user-scrap.repository.impl';
import { USER_REPOSITORY } from './domain/repository/user.repository';
import { USER_SCRAP_REPOSITORY } from './domain/repository/user-scrap.repository';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { UserEntity } from './infrastructure/orm-entity/user.entity';

@Module({
  imports: [MikroOrmModule.forFeature([UserEntity])],
  providers: [
    {
      provide: USER_REPOSITORY,
      useClass: UserRepositoryImpl,
    },
    {
      provide: USER_SCRAP_REPOSITORY,
      useClass: UserScrapRepositoryImpl,
    },
  ],
})
export class UserModule {}
