export class CreateAuthOrganizationCommand {
  constructor(
    public readonly accountId: string,
    public readonly password: string,
    public readonly name: string,
    public readonly contact: string,
  ) {}
}
