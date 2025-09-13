import { HttpStatus } from '@nestjs/common';

export enum CustomExceptionCode {
  // User
  USER_EMAIL_EMPTY = 'USER_EMAIL_EMPTY',
  USER_INVALID_EMAIL_FORMAT = 'USER_INVALID_EMAIL_FORMAT',
  USER_ROLE_EMPTY = 'USER_ROLE_EMPTY',
  USER_INVALID_ROLE = 'USER_INVALID_ROLE',
  USER_NOT_FOUND = 'USER_NOT_FOUND',

  // Auth
  AUTH_OAUTH_ID_EMPTY = 'AUTH_OAUTH_ID_EMPTY',
  AUTH_PROVIDER_EMPTY = 'AUTH_OAUTH_PROVIDER_EMPTY',
  AUTH_INVALID_PROVIDER = 'AUTH_INVALID_PROVIDER',
  AUTH_USER_ID_EMPTY = 'AUTH_USER_ID_EMPTY',
  AUTH_INFO_NOT_FOUND = 'AUTH_INFO_NOT_FOUND',
  AUTH_INVALID_REFRESH_TOKEN = 'AUTH_INVALID_REFRESH_TOKEN',
  AUTH_INVALID_ACCESS_TOKEN = 'AUTH_INVALID_ACCESS_TOKEN',
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

  // Auth
  // Domain
  [CustomExceptionCode.AUTH_OAUTH_ID_EMPTY]: {
    status: HttpStatus.BAD_REQUEST,
    message: '[Auth] OAuthId는 필수 입니다.',
  },
  [CustomExceptionCode.AUTH_PROVIDER_EMPTY]: {
    status: HttpStatus.BAD_REQUEST,
    message: '[Auth] OAuth Provider는 필수 입니다.',
  },
  [CustomExceptionCode.AUTH_INVALID_PROVIDER]: {
    status: HttpStatus.BAD_REQUEST,
    message: '[Auth] 유효하지 않은 OAuth Provider 입니다.',
  },
  [CustomExceptionCode.AUTH_USER_ID_EMPTY]: {
    status: HttpStatus.BAD_REQUEST,
    message: '[Auth] UserId는 필수 입니다.',
  },

  [CustomExceptionCode.AUTH_INFO_NOT_FOUND]: {
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    message: '[Auth] 해당 유저의 인증 정보를 찾을 수 없습니다.',
  },
  [CustomExceptionCode.AUTH_INVALID_REFRESH_TOKEN]: {
    status: HttpStatus.UNAUTHORIZED,
    message: '[Auth] 유효하지 않은 Refresh Token 입니다.',
  },

  // Infrastructure
  [CustomExceptionCode.AUTH_INVALID_ACCESS_TOKEN]: {
    status: HttpStatus.UNAUTHORIZED,
    message: '[Auth] 유효하지 않은 Access Token 입니다.',
  },
};
