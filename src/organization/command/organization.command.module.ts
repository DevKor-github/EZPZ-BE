import { Module } from '@nestjs/common';
import { OrganizationStoreImpl } from './infrastructure/organization.store.impl';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { OrganizationEntity } from './infrastructure/organization.entity';
import { CreateOrganizationUseCase } from './application/create-organization/create-organization.use-case';
import { CreateOrganizationListener } from './application/create-organization/create-organization.listener';
import { ORGANIZATION_STORE } from './domain/organization.store';

const usecases = [CreateOrganizationUseCase];
const listeners = [CreateOrganizationListener];

@Module({
  imports: [MikroOrmModule.forFeature([OrganizationEntity])],
  providers: [
    {
      provide: ORGANIZATION_STORE,
      useClass: OrganizationStoreImpl,
    },
    ...usecases,
    ...listeners,
  ],
  controllers: [],
})
export class OrganizationCommandModule {}
