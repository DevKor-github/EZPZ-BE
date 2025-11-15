import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { createDocs } from 'src/shared/core/presentation/base.docs';
import { ArticleModel } from '../domain/article.model';

export type OrganizationArticleViewEndpoint = 'list';

export const OrganizationArticleViewDocs = createDocs<OrganizationArticleViewEndpoint>({
  list: () =>
    applyDecorators(
      ApiOperation({
        summary: '조직 게시글 목록 조회',
        description: '조직에 속한 게시글 목록을 조회합니다.',
      }),
      ApiOkResponse({
        description: '조직 게시글 목록 조회 성공',
        type: [ArticleModel],
      }),
      ApiUnauthorizedResponse({
        description: '유효하지 않은 access token',
      }),
    ),
});
