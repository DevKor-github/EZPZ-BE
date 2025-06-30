import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { createDocs } from 'src/shared/presentation/docs/base.docs';

export type ArticleQueryEndpoint = 'list' | 'detail';

export const ArticleQueryDocs = createDocs<ArticleQueryEndpoint>({
  list: () =>
    applyDecorators(
      ApiOperation({
        summary: '게시글 목록 조회',
        description: '게시글 목록을 조회합니다.',
      }),
      ApiOkResponse({
        description: '게시글 목록 조회 성공',
      }),
      ApiBadRequestResponse({
        description: '잘못된 요청',
      }),
      ApiInternalServerErrorResponse({
        description: '서버 오류',
      }),
    ),

  detail: () =>
    applyDecorators(
      ApiOperation({
        summary: '게시글 상세 조회',
        description: '특정 게시글의 상세 정보를 조회합니다.',
      }),
      ApiOkResponse({
        description: '게시글 상세 조회 성공',
      }),
      ApiNotFoundResponse({
        description: '게시글을 찾을 수 없음',
      }),
    ),
});
