import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { SharedModule } from 'src/shared/shared.module';
import { USER_STORE } from './domain/user.store';
import { UserStoreImpl } from './infrastructure/user.store.impl';
import { UserController } from './presentation/user.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateUserUseCase } from './application/create/create.use-case';
import { DeleteUserUseCase } from './application/delete/delete.use-case';
import { USER_READER } from './domain/user.reader';
import { UserReaderImpl } from './infrastructure/user.reader.impl';
import { GetUserUseCase } from './application/get/get-user.use-case';
import { UserEntity } from './infrastructure/user.entity';
import { GetAllUsersUseCase } from './application/get-all/get-all-users.use-case';
import { UserAdminController } from './presentation/user.admin.controller';

const useCases = [DeleteUserUseCase, CreateUserUseCase, GetUserUseCase, GetAllUsersUseCase];

@Module({
  imports: [MikroOrmModule.forFeature([UserEntity]), SharedModule, CqrsModule],
  providers: [
    ...useCases,
    {
      provide: USER_STORE,
      useClass: UserStoreImpl,
    },
    {
      provide: USER_READER,
      useClass: UserReaderImpl,
    },
  ],
  exports: [...useCases],
  controllers: [UserController, UserAdminController],
})
export class UserModule {}
