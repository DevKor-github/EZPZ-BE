import { HttpException } from '@nestjs/common';
import { CustomExceptionCode, ExceptionInfo } from './custom-exception-code';

export class CustomException extends HttpException {
  constructor(
    public readonly code: CustomExceptionCode,
    public readonly data?: unknown,
  ) {
    const { status, message } = ExceptionInfo[code];
    super(message, status);
  }
}
