import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { createDocs } from 'src/shared/presentation/docs/base.docs';
import { GeneratePresignedUrlResponseDto } from '../application/generate-presigned-url/dto/generate-presigned-url.response.dto';

export type MediaCommandEndpoint = 'presignedUrl' | 'create';

export const MediaCommandDocs = createDocs<MediaCommandEndpoint>({
  presignedUrl: () =>
    applyDecorators(
      ApiOperation({
        summary: 'Presigned URL 생성',
        description: `
        ★ 게시글 생성 API 흐름

        1. POST /article 요청 => articleId 받음

        2. POST /media/presigned-url 
            => S3에 파일 업로드를 위한 Presigned URL을 생성
            => [{presignedUrl, objectKey}] 받음
            => thumbnail과 일반 이미지의 presignedUrl이 구분되어 있음
        
        3. PUT https://presigendUrl~~~
            => 2번에서 받은 presignedUrl을 통해 파일 업로드
            => 성공 시 200 OK 응답
        
        4. POST /media 요청
            => presignedUrl에서 받은 objectKey를 포함하여 미디어 메타데이터 저장
            => 성공 시 201 Created 응답
        `,
      }),
      ApiCreatedResponse({
        description: 'Presigned URL이 성공적으로 생성됨',
        type: GeneratePresignedUrlResponseDto,
      }),
      ApiBadRequestResponse({
        description: '잘못된 요청 형식',
      }),
      ApiUnauthorizedResponse({
        description: '인증 실패',
      }),
      ApiForbiddenResponse({
        description: 'S3 권한 없음 (예: 잘못된 AWS 자격 증명), CORS 정책 위반',
      }),
      ApiNotFoundResponse({
        description: '요청한 리소스가 존재하지 않음 (예: 잘못된 버킷 이름)',
      }),
      ApiInternalServerErrorResponse({
        description: '서버 오류',
      }),
    ),
  create: () =>
    applyDecorators(
      ApiOperation({
        summary: '미디어 생성',
        description: 'S3에 파일을 업로드하고 메타데이터를 저장합니다.',
      }),
      ApiCreatedResponse({
        description: '미디어가 성공적으로 생성됨',
      }),
      ApiBadRequestResponse({
        description: '잘못된 요청 형식',
      }),
      ApiUnauthorizedResponse({
        description: '인증 실패',
      }),
      ApiInternalServerErrorResponse({
        description: '서버 오류',
      }),
    ),
});
