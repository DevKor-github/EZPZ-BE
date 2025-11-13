import { ICommand } from '@nestjs/cqrs';

export class RenewTokenCommand implements ICommand {
  constructor(
    public readonly organizationId: string,
    public readonly jti: string,
  ) {}
}
