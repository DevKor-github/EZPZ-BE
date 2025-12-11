export class UpdateOrganizationCommand {
  constructor(
    public readonly organizationId: string,
    public readonly name?: string,
    public readonly contact?: string,
  ) {}
}
