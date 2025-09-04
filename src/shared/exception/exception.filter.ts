import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { CustomException } from './custom-exception';
import { ExceptionInfo } from './custom-exception-code';
import { BaseApiResponse } from '../core/presentation/base.api.response';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
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

      return response.status(status).json(res);
    }

    // Handle standard HttpExceptions (like BadRequestException)
    if (exception instanceof HttpException) {
      const status = exception.getStatus();

      const res: BaseApiResponse<unknown> = {
        success: false,
        message: exception.message,
        data: exception.message,
        errorCode: status.toString(),
      };

      return response.status(status).json(res);
    }

    return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Internal Server Error',
      errorCode: HttpStatus.INTERNAL_SERVER_ERROR.toString(),
    });
  }
}
