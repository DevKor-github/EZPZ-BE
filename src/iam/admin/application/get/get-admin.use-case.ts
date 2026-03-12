import { Inject, Injectable } from '@nestjs/common';
import { ADMIN_REPOSITORY, AdminRepository } from 'src/iam/admin/domain/admin.repository';
import { GetAdminQuery } from './get-admin.query';
import { AdminView } from 'src/iam/admin/domain/admin.view';

@Injectable()
export class GetAdminUseCase {
  constructor(
    @Inject(ADMIN_REPOSITORY)
    private readonly adminRepository: AdminRepository,
  ) {}

  async execute(query: GetAdminQuery): Promise<AdminView> {
    const admin = await this.adminRepository.loadById(query.adminId);

    return { name: admin.name };
  }
}
