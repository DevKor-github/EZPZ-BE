import { ICommand } from '@nestjs/cqrs';

export class DeleteScrapCommand implements ICommand {
  constructor(
    public readonly articleId: string,
    public readonly userId: string,
  ) {}
}
