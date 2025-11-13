import { Module } from '@nestjs/common';
import { OrganizationCommandModule } from './command/organization.command.module';
import { OrganizationQueryModule } from './query/organization.query.module';

@Module({
  imports: [OrganizationCommandModule, OrganizationQueryModule],
})
export class OrganizationModule {}
