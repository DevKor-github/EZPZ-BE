import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { SharedModule } from 'src/shared/shared.module';
import { AuthOrganizationController } from './presentation/auth-organization.controller';
import { AUTH_ORGANIZATION_STORE } from './domain/auth-organization.store';
import { AuthOrganizationStoreImpl } from './infrastructure/auth-organization.store.impl';
import { AuthCoreModule } from '../core/auth-core.module';
import { AuthOrganizationEntity } from './infrastructure/auth-organization.entity';
import { CreateAuthOrganizationUseCase } from './application/create/create.use-case';
import { CqrsModule } from '@nestjs/cqrs';
import { PASSWORD_HASHER } from './domain/password-hasher';
import { PasswordHasherImpl } from './infrastructure/password-hasher.impl';
import { RenewTokenUseCase } from './application/renew-token/renew-token.use-case';
import { LogoutUseCase } from './application/logout/logout.use-case';
import { LoginUseCase } from './application/login/login.use-case';
import { CheckAccountIdUseCase } from './application/check-account-id/check-account-id.use-case';

const usecases = [CreateAuthOrganizationUseCase, RenewTokenUseCase, LoginUseCase, LogoutUseCase, CheckAccountIdUseCase];

@Module({
  imports: [SharedModule, MikroOrmModule.forFeature([AuthOrganizationEntity]), AuthCoreModule, CqrsModule],
  providers: [
    {
      provide: AUTH_ORGANIZATION_STORE,
      useClass: AuthOrganizationStoreImpl,
    },
    {
      provide: PASSWORD_HASHER,
      useClass: PasswordHasherImpl,
    },
    ...usecases,
  ],
  controllers: [AuthOrganizationController],
  exports: [],
})
export class AuthOrganizationModule {}
