import { ICommand } from '@nestjs/cqrs';

export class CreateArticleCommand implements ICommand {
  constructor(
    public readonly organizationId: string,
    public readonly title: string,
    public readonly organization: string,
    public readonly description: string,
    public readonly location: string,
    public readonly startAt: string,
    public readonly endAt: string,
    public readonly tags: string[],
    public readonly registrationUrl?: string,
    public readonly registrationStartAt?: string,
    public readonly registrationEndAt?: string,
  ) {}
}
