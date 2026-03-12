export class LoginCommand {
  constructor(
    public readonly accountId: string,
    public readonly password: string,
  ) {}
}
