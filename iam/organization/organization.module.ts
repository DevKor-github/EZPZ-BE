import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ORGANIZATION_STORE } from './domain/organization.store';
import { OrganizationEntity } from './infrastructure/organization.entity';
import { OrganizationStoreImpl } from './infrastructure/organization.store.impl';
import { CreateOrganizationUseCase } from './application/create/create.use-case';
import { DeleteOrganizationUseCase } from './application/delete/delete.use-case';
import { UpdateOrganizationUseCase } from './application/update/update.use-case';
import { OrganizationController } from './presentation/organization.controller';
import { ORGANIZATION_READER } from './domain/organization.reader';
import { OrganizationReaderImpl } from './infrastructure/organization.reader.impl';
import { OrganizationViewEntity } from './infrastructure/organization.view.entity';
import { GetOrganizationUseCase } from './application/get/get-organization.use-case';
import { GetAllOrganizationsUseCase } from './application/get-all/get-all-organizations.use-case';
import { OrganizationAdminController } from './presentation/organization.admin.controller';

const usecases = [
  CreateOrganizationUseCase,
  UpdateOrganizationUseCase,
  DeleteOrganizationUseCase,
  GetOrganizationUseCase,
  GetAllOrganizationsUseCase,
];

@Module({
  imports: [MikroOrmModule.forFeature([OrganizationEntity, OrganizationViewEntity])],
  providers: [
    {
      provide: ORGANIZATION_STORE,
      useClass: OrganizationStoreImpl,
    },
    {
      provide: ORGANIZATION_READER,
      useClass: OrganizationReaderImpl,
    },
    ...usecases,
  ],
  controllers: [OrganizationController, OrganizationAdminController],
  exports: [...usecases],
})
export class OrganizationModule {}
