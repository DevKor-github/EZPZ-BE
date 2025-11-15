import { ICommand } from '@nestjs/cqrs';

export class DeleteArticleCommand implements ICommand {
  constructor(
    public readonly id: string,
    public readonly organizationId: string,
  ) {}
}
