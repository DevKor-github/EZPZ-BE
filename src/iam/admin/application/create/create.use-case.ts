import { ADMIN_REPOSITORY, AdminRepository } from 'src/iam/admin/domain/admin.repository';
import { CreateAdminCommand } from './create.command';
import { CreateAdminResult } from './create.result';
import { Inject, Injectable } from '@nestjs/common';
import { Admin } from 'src/iam/admin/domain/admin';
import { Identifier } from 'src/shared/core/domain/identifier';

@Injectable()
export class CreateAdminUseCase {
  constructor(
    @Inject(ADMIN_REPOSITORY)
    private readonly adminRepository: AdminRepository,
  ) {}

  async execute(command: CreateAdminCommand): Promise<CreateAdminResult> {
    const { name } = command;

    const admin = Admin.create({
      id: Identifier.create(),
      name,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await this.adminRepository.save(admin);

    return { adminId: admin.id.value };
  }
}
