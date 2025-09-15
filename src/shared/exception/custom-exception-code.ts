import { HttpStatus } from '@nestjs/common';

export enum CustomExceptionCode {
  // Article
  ARTICLE_TITLE_EMPTY = 'ARTICLE_TITLE_EMPTY',
  ARTICLE_ORGANIZATION_EMPTY = 'ARTICLE_ORGANIZATION_EMPTY',
  ARTICLE_LOCATION_EMPTY = 'ARTICLE_LOCATION_EMPTY',
  ARTICLE_START_AT_EMPTY = 'ARTICLE_START_AT_EMPTY',
  ARTICLE_START_AT_EXCEEDS_END_AT = 'ARTICLE_START_AT_EXCEEDS_END_AT',
  ARTICLE_END_AT_EMPTY = 'ARTICLE_END_AT_EMPTY',
  ARTICLE_SCRAP_COUNT_NEGATIVE = 'ARTICLE_SCRAP_NEGATIVE',
  ARTICLE_VIEW_COUNT_NEGATIVE = 'ARTICLE_VIEW_COUNT_NEGATIVE',
  ARTICLE_MEDIA_MAX_IMAGES_EXCEEDED = 'MEDIA_MAX_IMAGES_EXCEEDED',
  ARTICLE_NOT_FOUND = 'ARTICLE_NOT_FOUND',

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

  // Media
  MEDIA_PATH_EMPTY = 'MEDIA_PATH_EMPTY',
  MEDIA_INVALID_PATH = 'MEDIA_INVALID_PATH',
  MEDIA_ORDER_EMPTY = 'MEDIA_ORDER_EMPTY',
  MEDIA_ARTICLE_ID_EMPTY = 'MEDIA_ARTICLE_ID_EMPTY',

  // Scrap
  SCRAP_ARTICLE_ID_OR_USER_ID_EMPTY = 'SCRAP_ARTICLE_ID_OR_USER_ID_EMPTY',
  SCRAP_ALREADY_EXISTS = 'SCRAP_ALREADY_EXISTS',
  SCRAP_NOT_FOUND = 'SCRAP_NOT_FOUND',
}

export const ExceptionInfo: Record<CustomExceptionCode, { status: HttpStatus; message: string }> = {
  // Article
  // Domain
  [CustomExceptionCode.ARTICLE_TITLE_EMPTY]: {
    status: HttpStatus.BAD_REQUEST,
    message: '[Article] 제목은 필수입니다.',
  },
  [CustomExceptionCode.ARTICLE_ORGANIZATION_EMPTY]: {
    status: HttpStatus.BAD_REQUEST,
    message: '[Article] 조직은 필수입니다.',
  },
  [CustomExceptionCode.ARTICLE_LOCATION_EMPTY]: {
    status: HttpStatus.BAD_REQUEST,
    message: '[Article] 위치는 필수입니다.',
  },
  [CustomExceptionCode.ARTICLE_START_AT_EMPTY]: {
    status: HttpStatus.BAD_REQUEST,
    message: '[Article] 행사 시작일은 필수입니다.',
  },
  [CustomExceptionCode.ARTICLE_START_AT_EXCEEDS_END_AT]: {
    status: HttpStatus.BAD_REQUEST,
    message: '[Article] 행사 시작일은 종료일보다 이전이어야 합니다.',
  },
  [CustomExceptionCode.ARTICLE_END_AT_EMPTY]: {
    status: HttpStatus.BAD_REQUEST,
    message: '[Article] 행사 종료일은 필수입니다.',
  },
  [CustomExceptionCode.ARTICLE_SCRAP_COUNT_NEGATIVE]: {
    status: HttpStatus.BAD_REQUEST,
    message: '[Article] 스크랩 수는 0 이상이어야 합니다.',
  },
  [CustomExceptionCode.ARTICLE_VIEW_COUNT_NEGATIVE]: {
    status: HttpStatus.BAD_REQUEST,
    message: '[Article] 조회수는 0이상이어야 합니다.',
  },
  [CustomExceptionCode.ARTICLE_MEDIA_MAX_IMAGES_EXCEEDED]: {
    status: HttpStatus.BAD_REQUEST,
    message: '[Article] 이미지는 최대 10개까지 업로드할 수 있습니다.',
  },

  // Infrastructure
  [CustomExceptionCode.ARTICLE_NOT_FOUND]: {
    status: HttpStatus.NOT_FOUND,
    message: '[Article] 해당 게시글이 존재하지 않습니다.',
  },

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

  // Media
  // Domain
  [CustomExceptionCode.MEDIA_PATH_EMPTY]: {
    status: HttpStatus.BAD_REQUEST,
    message: '[Media] 미디어 경로는 필수 입니다.',
  },
  [CustomExceptionCode.MEDIA_INVALID_PATH]: {
    status: HttpStatus.BAD_REQUEST,
    message: '[Media] 유효하지 않은 미디어 경로 입니다.',
  },
  [CustomExceptionCode.MEDIA_ORDER_EMPTY]: {
    status: HttpStatus.BAD_REQUEST,
    message: '[Media] 미디어 순서는 필수 입니다.',
  },
  [CustomExceptionCode.MEDIA_ARTICLE_ID_EMPTY]: {
    status: HttpStatus.BAD_REQUEST,
    message: '[Media] articleId는 필수 입니다.',
  },

  // Scrap
  // Domain
  [CustomExceptionCode.SCRAP_ARTICLE_ID_OR_USER_ID_EMPTY]: {
    status: HttpStatus.BAD_REQUEST,
    message: '[Scrap] ArticleId와 UserId는 필수입니다.',
  },

  // Application
  [CustomExceptionCode.SCRAP_ALREADY_EXISTS]: {
    status: HttpStatus.CONFLICT,
    message: '[Scrap] 이미 스크랩한 게시물 입니다.',
  },

  // Infrastructure
  [CustomExceptionCode.SCRAP_NOT_FOUND]: {
    status: HttpStatus.NOT_FOUND,
    message: '[Scrap] 스크랩이 존재하지 않습니다.',
  },
};
