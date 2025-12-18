import { Module } from '@nestjs/common';
import { ADMIN_REPOSITORY } from './domain/admin.repository';
import { AdminRepositoryImpl } from './infrastructure/admin.repository.impl';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { AdminEntity } from './infrastructure/admin.entity';
import { SharedModule } from 'src/shared/shared.module';
import { AdminController } from './presentation/admin.controller';
import { GetAdminUseCase } from './application/get/get-admin.use-case';

const usecases = [GetAdminUseCase];

@Module({
  imports: [MikroOrmModule.forFeature([AdminEntity]), SharedModule],
  providers: [
    ...usecases,
    {
      provide: ADMIN_REPOSITORY,
      useClass: AdminRepositoryImpl,
    },
  ],
  exports: [...usecases],
  controllers: [AdminController],
})
export class AdminModule {}
