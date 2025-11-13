import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { OrganizationViewEntity } from './infrastructure/organization.view.entity';
import { ORGANIZATION_READER } from './domain/organization.reader';
import { OrganizationReaderImpl } from './infrastructure/organization.reader.impl';

@Module({
  imports: [MikroOrmModule.forFeature([OrganizationViewEntity])],
  providers: [
    {
      provide: ORGANIZATION_READER,
      useClass: OrganizationReaderImpl,
    },
  ],
})
export class OrganizationQueryModule {}
