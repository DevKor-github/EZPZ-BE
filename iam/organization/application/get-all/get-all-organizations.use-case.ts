import { Inject, Injectable } from '@nestjs/common';
import { ORGANIZATION_READER, OrganizationReader } from 'iam/organization/domain/organization.reader';
import { OrganizationView } from 'iam/organization/domain/organization.view';

@Injectable()
export class GetAllOrganizationsUseCase {
  constructor(
    @Inject(ORGANIZATION_READER)
    private readonly organizationReader: OrganizationReader,
  ) {}

  async execute(): Promise<OrganizationView[]> {
    return await this.organizationReader.findAll();
  }
}
