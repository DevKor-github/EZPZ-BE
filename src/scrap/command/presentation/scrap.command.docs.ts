import { applyDecorators } from '@nestjs/common';
import {
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { createDocs } from 'src/shared/presentation/docs/base.docs';

export type ScrapCommandEndpoint = 'addScrap' | 'deleteScrap';

export const ScrapCommandDocs = createDocs<ScrapCommandEndpoint>({
  addScrap: () =>
    applyDecorators(
      ApiOperation({
        summary: '스크랩 추가',
        description: '게시글을 스크랩합니다.',
      }),
      ApiParam({
        name: 'id',
        description: '게시글 ID',
      }),
      ApiOkResponse({
        description: '스크랩 추가 성공',
      }),
      ApiUnauthorizedResponse({
        description: '유효하지 않은 access token',
      }),
      ApiNotFoundResponse({
        description: '해당 게시글이 존재하지 않습니다.',
      }),
      ApiConflictResponse({
        description: '이미 스크랩한 게시글입니다.',
      }),
    ),
  deleteScrap: () =>
    applyDecorators(
      ApiOperation({
        summary: '스크랩 삭제',
        description: '게시글 스크랩 삭제',
      }),
      ApiParam({
        name: 'id',
        description: '게시글 ID',
      }),
      ApiOkResponse({
        description: '스크랩 삭제 성공',
      }),
      ApiUnauthorizedResponse({
        description: '유효하지 않은 access token',
      }),
      ApiNotFoundResponse({
        description: '해당 게시글이 존재하지 않습니다.',
      }),
    ),
});
