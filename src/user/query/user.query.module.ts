import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { UserEntity } from '../command/infrastructure/user.entity';
import { USER_QUERY_REPOSITORY } from './domain/user.query.repository';
import { UserQueryRepositoryImpl } from './infrastructure/user.query.repository.impl';
import { UserQueryController } from './presentation/user.query.controller';
import { GetMyInfoUseCase } from './application/get-my-info/get-my-info.use-case';

const usecases = [GetMyInfoUseCase];

@Module({
  imports: [MikroOrmModule.forFeature([UserEntity])],
  providers: [
    ...usecases,
    {
      provide: USER_QUERY_REPOSITORY,
      useClass: UserQueryRepositoryImpl,
    },
  ],
  controllers: [UserQueryController],
})
export class UserQueryModule {}
