import { ICommand } from '@nestjs/cqrs';

export class UpdateOrganizationCommand implements ICommand {
  constructor(
    public readonly organizationId: string,
    public readonly name?: string,
    public readonly contact?: string,
  ) {}
}
