export class RegisterAdminCommand {
  constructor(
    public readonly accountId: string,
    public readonly password: string,
    public readonly name: string,
  ) {}
}
