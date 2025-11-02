import { applyDecorators } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiFoundResponse,
  ApiInternalServerErrorResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { createDocs } from 'src/shared/core/presentation/base.docs';

export type AuthUserEndpoint = 'oauthAuthorization' | 'oauthCallback' | 'renewToken' | 'logout' | 'withdraw';

export const AuthUserDocs = createDocs<AuthUserEndpoint>({
  oauthAuthorization: () =>
    applyDecorators(
      ApiOperation({
        summary: 'OAuth 로그인 요청',
        description: 'OAuth 로그인 요청 처리. OAuth Provider로부터 인증 URL을 받아 리다이렉트',
      }),
      ApiFoundResponse({
        description: 'OAuth 로그인 창으로 리다이렉트',
      }),
    ),

  oauthCallback: () =>
    applyDecorators(
      ApiOperation({
        summary: 'OAuth Callback',
        description: `OAuth Provider로부터 인증 코드를 받아 사용자 정보 추출,
        첫 로그인 시 회원 가입 처리,
        accessToken과 refreshToken 발급
        `,
      }),
      ApiFoundResponse({
        description: 'Access Token과 Refresh Token이 발급됨',
      }),
      ApiUnauthorizedResponse({
        description: '유효하지 않은 인증 코드',
      }),
    ),

  renewToken: () =>
    applyDecorators(
      ApiOperation({
        summary: '토큰 갱신',
        description: 'Refresh Token을 사용하여 새로운 Access Token과 Refresh Token을 발급',
      }),
      ApiOkResponse({
        description: '새로운 Access Token과 Refresh Token이 발급됨',
      }),
      ApiUnauthorizedResponse({
        description: '유효하지 않은 Refresh Token',
      }),
    ),

  logout: () =>
    applyDecorators(
      ApiOperation({
        summary: '로그아웃',
        description: '사용자의 Access Token과 Refresh Token을 무효화하여 로그아웃 처리',
      }),
      ApiCreatedResponse({
        description: '로그아웃 성공',
      }),
      ApiUnauthorizedResponse({
        description: '유효하지 않은 토큰',
      }),
      ApiInternalServerErrorResponse({
        description: '유저 인증 정보가 존재하지 않음',
      }),
    ),

  withdraw: () =>
    applyDecorators(
      ApiOperation({
        summary: '회원탈퇴',
        description: '사용자 정보 및 인증 정보 삭제 및 토큰 무효화',
      }),
      ApiNoContentResponse({
        description: '회원탈퇴 성공',
      }),
      ApiUnauthorizedResponse({
        description: '유효하지 않은 토큰',
      }),
      ApiInternalServerErrorResponse({
        description: '유저 인증 정보가 존재하지 않음',
      }),
    ),
});
