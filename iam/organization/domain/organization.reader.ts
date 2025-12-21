import { OrganizationAdminView } from './organization.admin.view';
import { OrganizationView } from './organization.view';

export interface OrganizationReader {
  findById(organizationId: string): Promise<OrganizationView>;
  findAll(): Promise<OrganizationAdminView[]>;
}

export const ORGANIZATION_READER = Symbol('ORGANIZATION_READER');
