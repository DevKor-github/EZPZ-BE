import { applyDecorators } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { createDocs } from 'src/shared/core/presentation/base.docs';

export type UserCommandEndpoint = 'deleteMyInfo';

export const UserCommandDocs = createDocs<UserCommandEndpoint>({
  deleteMyInfo: () =>
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
});
