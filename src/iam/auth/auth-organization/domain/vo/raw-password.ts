import { CustomException } from 'src/shared/exception/custom-exception';
import { CustomExceptionCode } from 'src/shared/exception/custom-exception-code';

export class RawPassword {
  private constructor(readonly value: string) {}

  public static create(value: string): RawPassword {
    const rawPassword = new RawPassword(value);
    rawPassword.validate();

    return rawPassword;
  }

  public validate(): void {
    const hasLetter = /[a-zA-Z]/.test(this.value);
    const hasNumber = /[0-9]/.test(this.value);

    if (this.value.length < 10 || this.value.length > 30) {
      throw new CustomException(CustomExceptionCode.AUTH_ORGANIZATION_INVALID_PASSWORD_LENGTH);
    }

    if (!hasLetter || !hasNumber) {
      throw new CustomException(CustomExceptionCode.AUTH_ORGANIZATION_INVALID_PASSWORD_FORMAT);
    }
  }
}
