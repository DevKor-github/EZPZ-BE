import { OrganizationAdminView } from 'iam/organization/domain/organization.admin.view';

export class GetAllOrganizationsResult {
  organizations: OrganizationAdminView[];
  cursorId: string | null;
  cursorDate: string | null;
  hasNext: boolean;
}
