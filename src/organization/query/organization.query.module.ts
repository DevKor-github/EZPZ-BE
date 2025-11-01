import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { OrganizationViewEntity } from './infrastructure/organization.view.entity';

@Module({
  imports: [MikroOrmModule.forFeature([OrganizationViewEntity])],
})
export class OrganizationQueryModule {}
