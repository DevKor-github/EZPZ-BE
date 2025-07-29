import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { SharedModule } from 'src/shared/shared.module';
import { UserEntity } from './infrastructure/user.entity';
import { ScrapEntity } from 'src/scrap/command/infrastructure/scrap.entity';
import { USER_COMMAND_REPOSITORY } from './domain/user.command.repository';
import { UserCommandRepositoryImpl } from './infrastructure/user.command.repository.impl';
import { DeleteMyInfoUseCase } from './application/delete/delete.use-case';
import { CreateUserUseCase } from './application/create/create.use-case';

const useCases = [DeleteMyInfoUseCase, CreateUserUseCase];

@Module({
  imports: [MikroOrmModule.forFeature([UserEntity, ScrapEntity]), SharedModule],
  providers: [
    ...useCases,
    {
      provide: USER_COMMAND_REPOSITORY,
      useClass: UserCommandRepositoryImpl,
    },
  ],
  exports: [],
  controllers: [],
})
export class UserCommandModule {}
