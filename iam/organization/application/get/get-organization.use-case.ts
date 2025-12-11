import { Inject, Injectable } from '@nestjs/common';
import { GetOrganizationQuery } from './get-organization.query';
import { OrganizationView } from 'iam/organization/domain/organization.view';
import { ORGANIZATION_READER, OrganizationReader } from 'iam/organization/domain/organization.reader';

@Injectable()
export class GetOrganizationUseCase {
  constructor(
    @Inject(ORGANIZATION_READER)
    private readonly organizationReader: OrganizationReader,
  ) {}

  async execute(query: GetOrganizationQuery): Promise<OrganizationView> {
    return await this.organizationReader.findById(query.organizationId);
  }
}
