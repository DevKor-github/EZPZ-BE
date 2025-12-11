import { CustomException } from 'src/shared/exception/custom-exception';
import { CustomExceptionCode } from 'src/shared/exception/custom-exception-code';

export class AccountId {
  private constructor(readonly value: string) {}

  public static create(value: string): AccountId {
    const accountId = new AccountId(value);
    accountId.validate();

    return accountId;
  }

  public validate(): void {
    if (this.value.length < 4 || this.value.length > 20) {
      throw new CustomException(CustomExceptionCode.AUTH_ORGANIZATION_INVALID_ACCOUNT_ID_LENGTH);
    }

    if (/^[a-z0-9_]+$/.test(this.value) === false) {
      throw new CustomException(CustomExceptionCode.AUTH_ORGANIZATION_INVALID_ACCOUNT_ID_FORMAT);
    }
  }
}
