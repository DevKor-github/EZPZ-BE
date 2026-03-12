import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { OrganizationModule } from './organization/organization.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [AuthModule, UserModule, OrganizationModule, AdminModule],
})
export class IamModule {}
