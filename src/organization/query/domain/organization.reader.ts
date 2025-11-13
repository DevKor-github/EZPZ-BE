import { OrganizationModel } from './organization.model';

export interface OrganizationReader {
  findById(organizationId: string): Promise<OrganizationModel>;
}

export const ORGANIZATION_READER = Symbol('ORGANIZATION_READER');
