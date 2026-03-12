export class ChangePasswordCommand {
  constructor(
    public readonly organizationId: string,
    public readonly currentPassword: string,
    public readonly newPassword: string,
  ) {}
}
