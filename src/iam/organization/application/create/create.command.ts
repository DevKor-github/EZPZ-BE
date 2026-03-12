export class CreateOrganizationCommand {
  constructor(
    public readonly name: string,
    public readonly contact: string,
  ) {}
}
