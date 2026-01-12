import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { AuthAdminEntity } from './infrastructure/auth-admin.entity';
import { AUTH_ADMIN_REPOSITORY } from './domain/auth-admin.repository';
import { AuthAdminRepositoryImpl } from './infrastructure/auth-admin.repository.impl';
import { AuthCoreModule } from '../auth-core/auth-core.module';
import { AdminLoginUseCase } from './application/login/login.use-case';
import { AuthAdminController } from './presentation/auth-admin.controller';
import { AdminModule } from 'iam/admin/admin.module';
import { RegisterAdminUseCase } from './application/register/register-admin.use-case';
import { JwtAdminAccessStrategy } from './infrastructure/jwt/jwt-access.strategy';
import { JwtAdminRefreshStrategy } from './infrastructure/jwt/jwt-refresh.strategy';

const usecases = [RegisterAdminUseCase, AdminLoginUseCase];
const jwt = [JwtAdminAccessStrategy, JwtAdminRefreshStrategy];

@Module({
  imports: [MikroOrmModule.forFeature([AuthAdminEntity]), AuthCoreModule, AdminModule],
  providers: [
    ...usecases,
    ...jwt,
    {
      provide: AUTH_ADMIN_REPOSITORY,
      useClass: AuthAdminRepositoryImpl,
    },
  ],
  controllers: [AuthAdminController],
  exports: [],
})
export class AuthAdminModule {}
