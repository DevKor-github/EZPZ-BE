import { ICommand } from '@nestjs/cqrs';

export class CreateAuthOrganizationCommand implements ICommand {
  constructor(
    public readonly accountId: string,
    public readonly password: string,
    public readonly name: string,
    public readonly contact: string,
  ) {}
}
