import { applyDecorators } from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { createDocs } from 'src/shared/presentation/docs/base.docs';
import { CheckScrapResponseDto } from '../application/check-scrap/dto/check-scrap.response.dto';
import { ScrapModel } from '../domain/scrap.model';
import { GetMyScrapRequestDto } from './dto/get-my-scrap.request.dto';

export type ScrapQueryEndpoint = 'getMyScrap' | 'checkScrap';

export const ScrapQueryDocs = createDocs<ScrapQueryEndpoint>({
  getMyScrap: () =>
    applyDecorators(
      ApiOperation({
        summary: '본인 스크랩 목록 조회',
        description: '사용자가 스크랩한 게시글 목록 조회.',
      }),
      ApiQuery({
        description: '스크랩 목록 조회 쿼리',
        type: GetMyScrapRequestDto,
      }),
      ApiOkResponse({
        description: '스크랩 목록 조회 성공',
        type: ScrapModel,
        isArray: true,
      }),
      ApiUnauthorizedResponse({
        description: '유효하지 않은 access token',
      }),
      ApiNotFoundResponse({
        description: '해당 게시글이 존재하지 않습니다.',
      }),
    ),
  checkScrap: () =>
    applyDecorators(
      ApiOperation({
        summary: '스크랩 여부 확인',
        description: '게시글이 스크랩되었는지 확인',
      }),
      ApiParam({
        name: 'id',
        description: '게시글 ID',
      }),
      ApiOkResponse({
        description: '스크랩 여부 확인 성공',
        type: CheckScrapResponseDto,
      }),
      ApiUnauthorizedResponse({
        description: '유효하지 않은 access token',
      }),
      ApiNotFoundResponse({
        description: '해당 게시글이 존재하지 않습니다.',
      }),
    ),
});
