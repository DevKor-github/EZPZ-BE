import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { SharedModule } from 'src/shared/shared.module';
import { UserEntity } from './infrastructure/user.entity';
import { USER_COMMAND_REPOSITORY } from './domain/user.command.repository';
import { UserCommandRepositoryImpl } from './infrastructure/user.command.repository.impl';
import { CreateUserHandler } from './application/create/create-user.handler';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateUserListener } from './application/create/create-user.listener';
import { DeleteMyInfoHandler } from './application/delete/delete.handler';
import { UserCommandController } from './presentation/user.command.controller';

const useCases = [DeleteMyInfoHandler, CreateUserHandler];
const listeners = [CreateUserListener];

@Module({
  imports: [MikroOrmModule.forFeature([UserEntity]), SharedModule, CqrsModule],
  providers: [
    ...useCases,
    ...listeners,
    {
      provide: USER_COMMAND_REPOSITORY,
      useClass: UserCommandRepositoryImpl,
    },
  ],
  exports: [],
  controllers: [UserCommandController],
})
export class UserCommandModule {}
