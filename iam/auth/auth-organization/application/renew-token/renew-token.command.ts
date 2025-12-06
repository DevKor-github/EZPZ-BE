export class RenewTokenCommand {
  constructor(
    public readonly organizationId: string,
    public readonly jti: string,
  ) {}
}
