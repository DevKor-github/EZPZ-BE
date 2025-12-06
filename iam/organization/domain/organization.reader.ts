import { OrganizationView } from './organization.view';

export interface OrganizationReader {
  findById(organizationId: string): Promise<OrganizationView>;
}

export const ORGANIZATION_READER = Symbol('ORGANIZATION_READER');
