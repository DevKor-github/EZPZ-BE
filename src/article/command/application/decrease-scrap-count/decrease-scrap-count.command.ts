import { ICommand } from '@nestjs/cqrs';

export class DecreaseScrapCountCommand implements ICommand {
  constructor(public readonly articleId: string) {}
}
