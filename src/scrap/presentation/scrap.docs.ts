import { applyDecorators } from '@nestjs/common';
import {
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { createDocs } from 'src/shared/presentation/docs/base.docs';
import { GetMyScrapResponseDto } from '../application/get-my-scrap/dto/get-my-scrap.response.dto';
import { CheckScrapResponseDto } from '../application/check-scrap/dto/check-scrap.response.dto';

export type ScrapEndpoint = 'getMyScrap' | 'addScrap' | 'checkScrap';

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
  addScrap: () =>
    applyDecorators(
      ApiOperation({
        summary: '스크랩 추가',
        description: '게시글을 스크랩합니다.',
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
  checkScrap: () =>
    applyDecorators(
      ApiOperation({
        summary: '스크랩 여부 확인',
        description: '게시글이 스크랩되었는지 확인',
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
