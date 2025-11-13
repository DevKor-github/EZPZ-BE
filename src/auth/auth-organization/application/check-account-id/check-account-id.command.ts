import { ICommand } from '@nestjs/cqrs';

export class CheckAccountIdCommand implements ICommand {
  constructor(public readonly accountId: string) {}
}
