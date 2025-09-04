import { HttpStatus } from '@nestjs/common';

export enum CustomExceptionCode {
  // User
  USER_EMAIL_EMPTY = 'USER_EMAIL_EMPTY',
  USER_INVALID_EMAIL_FORMAT = 'USER_INVALID_EMAIL_FORMAT',
  USER_ROLE_EMPTY = 'USER_ROLE_EMPTY',
  USER_INVALID_ROLE = 'USER_INVALID_ROLE',
  USER_NOT_FOUND = 'USER_NOT_FOUND',
}

export const ExceptionInfo: Record<CustomExceptionCode, { status: HttpStatus; message: string }> = {
  // User
  [CustomExceptionCode.USER_EMAIL_EMPTY]: {
    status: HttpStatus.BAD_REQUEST,
    message: '[User] 이메일은 필수입니다.',
  },
  [CustomExceptionCode.USER_INVALID_EMAIL_FORMAT]: {
    status: HttpStatus.BAD_REQUEST,
    message: '[User] 이메일 형식이 유효하지 않습니다.',
  },
  [CustomExceptionCode.USER_ROLE_EMPTY]: {
    status: HttpStatus.FORBIDDEN,
    message: '[User] 역할은 필수입니다.',
  },
  [CustomExceptionCode.USER_INVALID_ROLE]: {
    status: HttpStatus.FORBIDDEN,
    message: '[User] 역할이 유효하지 않습니다.',
  },
  [CustomExceptionCode.USER_NOT_FOUND]: {
    status: HttpStatus.NOT_FOUND,
    message: '[UserRepository] 해당 사용자가 존재하지 않습니다.',
  },
};
