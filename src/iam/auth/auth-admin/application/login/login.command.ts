export class AdminLoginCommand {
  constructor(
    public readonly accountId: string,
    public readonly password: string,
  ) {}
}
