import { ICommand } from '@nestjs/cqrs';

export class IncreaseScrapCountCommand implements ICommand {
  constructor(public readonly articleId: string) {}
}
