import { Inject, Injectable } from '@nestjs/common';
import { ORGANIZATION_READER, OrganizationReader } from 'src/iam/organization/domain/organization.reader';
import { GetAllOrganizationsQuery } from './get-all-organizations.query';
import { GetAllOrganizationsResult } from './get-all-organizations.result';

@Injectable()
export class GetAllOrganizationsUseCase {
  constructor(
    @Inject(ORGANIZATION_READER)
    private readonly organizationReader: OrganizationReader,
  ) {}

  async execute(query: GetAllOrganizationsQuery): Promise<GetAllOrganizationsResult> {
    const { pageSize, cursorId, cursorDate } = query;

    const organizationAdminViews = await this.organizationReader.findAllByCursor(pageSize, cursorId, cursorDate);

    const hasNext = organizationAdminViews.length > pageSize;

    const organizations = hasNext ? organizationAdminViews.slice(0, pageSize) : organizationAdminViews;
    const lastItem = organizations[organizations.length - 1];
    const nextCursorId = hasNext && lastItem ? lastItem.id : null;
    const nextCursorDate = hasNext && lastItem ? lastItem.createdAt : null;

    return {
      organizations,
      cursorId: nextCursorId,
      cursorDate: nextCursorDate,
      hasNext,
    };
  }
}
