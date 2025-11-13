import { Organization } from './organization';

export interface OrganizationStore {
  save(organization: Organization): Promise<void>;
  loadById(organizationId: string): Promise<Organization | null>;
  updateById(organization: Organization): Promise<void>;
  deleteById(organizationId: string): Promise<void>;
}

export const ORGANIZATION_STORE = Symbol('ORGANIZATION_STORE');
