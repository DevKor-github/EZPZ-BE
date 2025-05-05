import { Module } from '@nestjs/common';
import { AUTH_REPOSITORY } from './domain/repository/auth.repository';
import { AuthRepositoryImpl } from './infrastructure/repository/auth.repository.impl';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { AuthEntity } from './infrastructure/orm-entity/auth.entity';
import { UserEntity } from 'src/user/infrastructure/orm-entity/user.entity';

@Module({
  imports: [MikroOrmModule.forFeature([AuthEntity, UserEntity])],
  providers: [
    {
      provide: AUTH_REPOSITORY,
      useClass: AuthRepositoryImpl,
    },
  ],
})
export class AuthModule {}
