export class PasswordHash {
  private constructor(readonly value: string) {}

  public static create(value: string): PasswordHash {
    const passwordHash = new PasswordHash(value);

    return passwordHash;
  }
}
