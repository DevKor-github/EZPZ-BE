import { ICommand } from '@nestjs/cqrs';

export class LoginCommand implements ICommand {
  constructor(
    public readonly accountId: string,
    public readonly password: string,
  ) {}
}
