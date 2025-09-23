import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { Response } from 'express';
import { CustomException } from './custom-exception';
import { ExceptionInfo } from './custom-exception-code';
import { BaseApiResponse } from '../core/presentation/base.api.response';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (exception instanceof CustomException) {
      const { code, data } = exception;
      const { status, message } = ExceptionInfo[code];

      const res: BaseApiResponse<unknown> = {
        success: false,
        message,
        data: data,
        errorCode: status.toString(),
      };

      this.logger.error(`${code}(${status}) - ${message}, data=${JSON.stringify(data)}`);

      return response.status(status).json(res);
    }

    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      let message: string;

      if (typeof exceptionResponse === 'string') {
        message = exceptionResponse;
      } else if (
        typeof exceptionResponse === 'object' &&
        exceptionResponse !== null &&
        'message' in exceptionResponse
      ) {
        message = (exceptionResponse as { message: string }).message;
      } else {
        message = 'Unexpected error';
      }

      const res: BaseApiResponse<unknown> = {
        success: false,
        message,
        data: null,
        errorCode: status.toString(),
      };

      this.logger.error(`[HttpException] status=${status}, message=${JSON.stringify(message)}`);

      return response.status(status).json(res);
    }

    if (exception instanceof Error) {
      this.logger.error(exception.stack);
    } else {
      this.logger.error(String(exception));
    }

    const res: BaseApiResponse<unknown> = {
      success: false,
      message: 'Internal server error',
      data: null,
      errorCode: HttpStatus.INTERNAL_SERVER_ERROR.toString(),
    };

    return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(res);
  }
}
