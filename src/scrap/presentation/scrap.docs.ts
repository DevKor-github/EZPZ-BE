import { applyDecorators } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { createDocs } from 'src/shared/presentation/docs/base.docs';
import { GetMyScrapResponseDto } from '../application/get-my-scrap/dto/get-my-scrap.response.dto';

export type ScrapEndpoint = 'getMyScrap';

export const ScrapDocs = createDocs<ScrapEndpoint>({
  getMyScrap: () =>
    applyDecorators(
      ApiOperation({
        summary: '본인 스크랩 목록 조회',
        description: '사용자가 스크랩한 게시글 목록 조회.',
      }),
      ApiOkResponse({
        description: '스크랩 목록 조회 성공',
        type: GetMyScrapResponseDto,
        isArray: true,
      }),
      ApiUnauthorizedResponse({
        description: '유효하지 않은 access token',
      }),
      ApiNotFoundResponse({
        description: '해당 게시글이 존재하지 않습니다.',
      }),
    ),
});
