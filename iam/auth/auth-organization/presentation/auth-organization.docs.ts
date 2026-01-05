import { applyDecorators } from '@nestjs/common';
import {
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { createDocs } from 'src/shared/core/presentation/base.docs';
import { RegisterOrganizationRequestDto } from './dto/request/register-organization.request.dto';
import { LoginRequestDto } from './dto/request/login.request.dto';
import { CheckAccountIdRequestDto } from './dto/request/check-account-id.request.dto';
import { CheckAccountIdResponseDto } from './dto/response/check-account-id.response.dto';

export type AuthOrganizationEndpoint = 'register' | 'login' | 'logout' | 'refresh' | 'checkAccountId' | 'withdraw';

export const AuthOrganizationDocs = createDocs<AuthOrganizationEndpoint>({
  register: () =>
    applyDecorators(
      ApiOperation({
        summary: '회원가입',
        description: '아이디, 비밀번호, 연락처, 조직명을 받아 회원가입 처리',
      }),
      ApiBody({
        description: '회원가입 요청 DTO',
        type: RegisterOrganizationRequestDto,
      }),
      ApiCreatedResponse({
        description: '회원가입 성공',
      }),
      ApiConflictResponse({
        description: '이미 존재하는 계정',
      }),
    ),
  login: () =>
    applyDecorators(
      ApiOperation({
        summary: '로그인',
        description: '아이디, 비밀번호를 받아 로그인 처리',
      }),
      ApiBody({
        description: '로그인 요청 DTO',
        type: LoginRequestDto,
      }),
      ApiOkResponse({
        description: '로그인 성공',
      }),
      ApiNotFoundResponse({
        description: '아이디 또는 비밀번호 불일치',
      }),
    ),
  checkAccountId: () =>
    applyDecorators(
      ApiOperation({
        summary: '아이디 중복 체크',
        description: '아이디 중복 체크',
      }),
      ApiBody({
        description: '아이디 중복 체크 요청 DTO',
        type: CheckAccountIdRequestDto,
      }),
      ApiOkResponse({
        description: '아이디 중복 체크 성공',
        type: CheckAccountIdResponseDto,
      }),
      ApiNotFoundResponse({
        description: '아이디가 존재하지 않음',
      }),
    ),
  logout: () =>
    applyDecorators(
      ApiOperation({
        summary: '로그아웃',
        description: '현재 사용자를 로그아웃 처리',
      }),
      ApiOkResponse({
        description: '로그아웃 성공',
      }),
      ApiUnauthorizedResponse({
        description: '유효하지 않은 access token',
      }),
    ),
  refresh: () =>
    applyDecorators(
      ApiOperation({
        summary: '토큰 갱신',
        description: '쿠키의 Refresh Token을 추출해 토큰 갱신 처리',
      }),
      ApiOkResponse({
        description: '토큰 갱신 성공',
      }),
      ApiUnauthorizedResponse({
        description: '유효하지 않은 refresh token',
      }),
    ),
  withdraw: () =>
    applyDecorators(
      ApiOperation({
        summary: 'organization 삭제',
        description: '조직을 삭제합니다.',
      }),
      ApiOkResponse({
        description: 'organization 삭제 성공',
      }),
      ApiUnauthorizedResponse({
        description: '유효하지 않은 access token',
      }),
    ),
});
