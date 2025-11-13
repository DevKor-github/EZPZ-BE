import { Module } from '@nestjs/common';
import { SharedModule } from 'src/shared/shared.module';
import { CqrsModule } from '@nestjs/cqrs';
import { AuthUserModule } from './auth-user/auth-user.module';
import { AuthOrganizationModule } from './auth-organization/auth-organization.module';
import { AuthCoreModule } from './core/auth-core.module';

@Module({
  imports: [SharedModule, CqrsModule, AuthUserModule, AuthOrganizationModule, AuthCoreModule],
  providers: [],
})
export class AuthModule {}
