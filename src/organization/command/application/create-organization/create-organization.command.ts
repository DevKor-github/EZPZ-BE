import { ICommand } from '@nestjs/cqrs';
import { Identifier } from 'src/shared/core/domain/identifier';

export class CreateOrganizationCommand implements ICommand {
  constructor(
    public readonly organizationId: Identifier,
    public readonly name: string,
    public readonly contact: string,
  ) {}
}
