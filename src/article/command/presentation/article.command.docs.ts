import { applyDecorators } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { createDocs } from 'src/shared/presentation/docs/base.docs';

export type ArticleCommandEndpoint = 'create' | 'update' | 'delete';

export const ArticleCommandDocs = createDocs<ArticleCommandEndpoint>({
  create: () =>
    applyDecorators(
      ApiOperation({
        summary: '게시글 생성',
        description: '새로운 게시글을 생성합니다.',
      }),
      ApiCreatedResponse({
        description: '게시글 생성 성공',
      }),
      ApiInternalServerErrorResponse({
        description: '게시글 생성 실패',
      }),
    ),

  update: () =>
    applyDecorators(
      ApiOperation({
        summary: '게시글 수정',
        description: '기존 게시글을 수정합니다. 미디어는 기존 목록과 비교하여 삭제된 것은 제거됩니다.',
      }),
      ApiOkResponse({
        description: '게시글 수정 성공',
      }),
      ApiNotFoundResponse({
        description: '게시글을 찾을 수 없음',
      }),
      ApiInternalServerErrorResponse({
        description: '게시글 수정 실패',
      }),
    ),

  delete: () =>
    applyDecorators(
      ApiOperation({
        summary: '게시글 삭제',
        description: '특정 게시글을 삭제합니다.',
      }),
      ApiNoContentResponse({
        description: '게시글 삭제 성공',
      }),
      ApiNotFoundResponse({
        description: '게시글을 찾을 수 없음',
      }),
    ),
});
