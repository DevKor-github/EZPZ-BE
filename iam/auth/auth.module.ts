import { Module } from '@nestjs/common';
import { AuthUserModule } from './auth-user/auth-user.module';
import { AuthOrganizationModule } from './auth-organization/auth-organization.module';
import { AuthCoreModule } from './auth-core/auth-core.module';

@Module({
  imports: [AuthUserModule, AuthOrganizationModule, AuthCoreModule],
  providers: [],
})
export class AuthModule {}
