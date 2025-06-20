import { applyDecorators } from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiNotFoundResponse,
  ApiNoContentResponse,
  ApiCreatedResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { createDocs } from 'src/shared/presentation/docs/base.docs';

export type ArticleEndpoint = 'list' | 'detail' | 'create' | 'delete';

export const ArticleDocs = createDocs<ArticleEndpoint>({
  list: () =>
    applyDecorators(
      ApiOperation({
        summary: '게시글 목록 조회',
        description: '태그와 필터 조건에 맞는 게시글 목록을 조회하고 원하는 기준으로 정렬 가능',
      }),
      ApiOkResponse({
        description: '게시글 목록 조회 성공',
      }),
      ApiBadRequestResponse({
        description: '잘못된 필터 조건이나 정렬 기준',
      }),
      ApiInternalServerErrorResponse({
        description: '서버 오류',
      }),
    ),

  detail: () =>
    applyDecorators(
      ApiOperation({
        summary: '게시글 상세 조회',
        description: '특정 게시글의 상세 정보를 조회',
      }),
      ApiOkResponse({
        description: '게시글 상세 조회 성공',
      }),
      ApiNotFoundResponse({
        description: '게시글을 찾을 수 없음',
      }),
    ),

  create: () =>
    applyDecorators(
      ApiOperation({
        summary: '게시글 생성',
        description: '새로운 게시글을 생성',
      }),
      ApiCreatedResponse({
        description: '게시글 생성 성공',
      }),
      ApiInternalServerErrorResponse({
        description: '게시글 생성 실패',
      }),
    ),

  delete: () =>
    applyDecorators(
      ApiOperation({
        summary: '게시글 삭제',
        description: '특정 게시글을 삭제',
      }),
      ApiNoContentResponse({
        description: '게시글 삭제 성공',
      }),
      ApiNotFoundResponse({
        description: '게시글을 찾을 수 없음',
      }),
    ),
});
