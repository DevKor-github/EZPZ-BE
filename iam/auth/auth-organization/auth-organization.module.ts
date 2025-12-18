import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { SharedModule } from 'src/shared/shared.module';
import { AUTH_ORGANIZATION_STORE } from './domain/auth-organization.store';
import { AuthOrganizationEntity } from './infrastructure/auth-organization.entity';
import { CqrsModule } from '@nestjs/cqrs';
import { AuthOrganizationStoreImpl } from './infrastructure/auth-organization.store.impl';
import { AuthCoreModule } from '../auth-core/auth-core.module';
import { CheckAccountIdUseCase } from './application/check-account-id/check-account-id.use-case';
import { RenewTokenUseCase } from './application/renew-token/renew-token.use-case';
import { LoginUseCase } from './application/login/login.use-case';
import { LogoutUseCase } from './application/logout/logout.use-case';
import { AuthOrganizationController } from './presentation/auth-organization.controller';
import { RegisterOrganizationUseCase } from './application/register-organization/register-organization.use-case';
import { OrganizationModule } from 'iam/organization/organization.module';

const usecases = [RegisterOrganizationUseCase, RenewTokenUseCase, LoginUseCase, LogoutUseCase, CheckAccountIdUseCase];

@Module({
  imports: [
    SharedModule,
    MikroOrmModule.forFeature([AuthOrganizationEntity]),
    AuthCoreModule,
    OrganizationModule,
    CqrsModule,
  ],
  providers: [
    ...usecases,
    {
      provide: AUTH_ORGANIZATION_STORE,
      useClass: AuthOrganizationStoreImpl,
    },
  ],
  controllers: [AuthOrganizationController],
  exports: [],
})
export class AuthOrganizationModule {}
