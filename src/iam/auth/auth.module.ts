import { Module } from '@nestjs/common';
import { AuthUserModule } from './auth-user/auth-user.module';
import { AuthOrganizationModule } from './auth-organization/auth-organization.module';
import { AuthCoreModule } from './auth-core/auth-core.module';
import { AuthAdminModule } from './auth-admin/auth-admin.module';

@Module({
  imports: [AuthUserModule, AuthOrganizationModule, AuthAdminModule, AuthCoreModule],
  providers: [],
})
export class AuthModule {}
