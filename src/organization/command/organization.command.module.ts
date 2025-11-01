import { Module } from '@nestjs/common';
import { ORGANIZATION_COMMAND_REPOSITORY } from './domain/organization.command.repository';
import { OrganizationCommandRepositoryImpl } from './infrastructure/organization.command.repository.impl';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { OrganizationEntity } from './infrastructure/organization.entity';
import { CreateOrganizationUseCase } from './application/create-organization/create-organization.use-case';

const usecases = [CreateOrganizationUseCase];

@Module({
  imports: [MikroOrmModule.forFeature([OrganizationEntity])],
  providers: [
    {
      provide: ORGANIZATION_COMMAND_REPOSITORY,
      useClass: OrganizationCommandRepositoryImpl,
    },
    ...usecases,
  ],
  controllers: [],
})
export class OrganizationCommandModule {}
