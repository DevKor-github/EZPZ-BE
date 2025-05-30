import { Module } from '@nestjs/common';
import { UserRepositoryImpl } from './infrastructure/repository/user.repository.impl';
import { UserScrapRepositoryImpl } from './infrastructure/repository/user-scrap.repository.impl';
import { USER_REPOSITORY } from './domain/repository/user.repository';
import { USER_SCRAP_REPOSITORY } from './domain/repository/user-scrap.repository';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { UserEntity } from './infrastructure/orm-entity/user.entity';
import { CreateUserUseCase } from './application/use-case/create-user.use-case';
import { ScrapEntity } from './infrastructure/orm-entity/scrap.entity';

const useCases = [CreateUserUseCase];

@Module({
  imports: [MikroOrmModule.forFeature([UserEntity, ScrapEntity])],
  providers: [
    ...useCases,
    {
      provide: USER_REPOSITORY,
      useClass: UserRepositoryImpl,
    },
    {
      provide: USER_SCRAP_REPOSITORY,
      useClass: UserScrapRepositoryImpl,
    },
  ],
  exports: [...useCases],
})
export class UserModule {}
