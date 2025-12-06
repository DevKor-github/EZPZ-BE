import { Identifier } from 'src/shared/core/domain/identifier';

export class CreateOrganizationCommand {
  constructor(
    public readonly organizationId: Identifier,
    public readonly name: string,
    public readonly contact: string,
  ) {}
}
