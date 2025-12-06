import { applyDecorators } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { createDocs } from 'src/shared/core/presentation/base.docs';
import { UserView } from '../domain/user.view';

export type UserEndpoint = 'deleteUser' | 'getUser';

export const UserDocs = createDocs<UserEndpoint>({
  deleteUser: () =>
    applyDecorators(
      ApiOperation({
        summary: '회원탈퇴',
        description: '회원탈퇴',
      }),
      ApiOkResponse({
        description: '회원탈퇴 성공',
      }),
      ApiUnauthorizedResponse({
        description: '유효하지 않은 access token',
      }),
      ApiNotFoundResponse({
        description: '존재하지 않는 사용자',
      }),
    ),

  getUser: () =>
    applyDecorators(
      ApiOperation({
        summary: '본인 정보 조회',
        description: '로그인 사용자 정보 조회',
      }),
      ApiOkResponse({
        description: '사용자 이메일 정보 반환',
        type: UserView,
      }),
      ApiUnauthorizedResponse({
        description: '유효하지 않은 access token',
      }),
      ApiNotFoundResponse({
        description: '존재하지 않는 사용자',
      }),
    ),
});
