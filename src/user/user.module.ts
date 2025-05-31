import { Module } from '@nestjs/common';
import { UserRepositoryImpl } from './infrastructure/repository/user.repository.impl';
import { USER_REPOSITORY } from './domain/repository/user.repository';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { UserEntity } from './infrastructure/orm-entity/user.entity';
import { CreateUserUseCase } from './application/create-user/create-user.use-case';
import { ScrapEntity } from '../scrap/infrastructure/orm-entity/scrap.entity';
import { UserController } from './presentation/user.controller';
import { GetMyInfoUseCase } from './application/get-my-info/get-my-info.use-case';
import { DeleteMyInfoUseCase } from './application/delete-my-info/delete-my-info.use-case';

const useCases = [CreateUserUseCase, GetMyInfoUseCase, DeleteMyInfoUseCase];

@Module({
  imports: [MikroOrmModule.forFeature([UserEntity, ScrapEntity])],
  providers: [
    ...useCases,
    {
      provide: USER_REPOSITORY,
      useClass: UserRepositoryImpl,
    },
  ],
  exports: [...useCases],
  controllers: [UserController],
})
export class UserModule {}
