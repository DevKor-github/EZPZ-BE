import { ICommand } from '@nestjs/cqrs';

export class AddScrapCommand implements ICommand {
  constructor(
    public readonly articleId: string,
    public readonly userId: string,
  ) {}
}
