import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { createDocs } from 'src/shared/presentation/docs/base.docs';
import { GeneratePresignedUrlResponseDto } from '../application/generate-presigned-url/dto/generate-presigned-url.response.dto';

export type MediaCommandEndpoint = 'presignedUrl';

export const MediaCommandDocs = createDocs<MediaCommandEndpoint>({
  presignedUrl: () =>
    applyDecorators(
      ApiOperation({
        summary: 'Presigned URL 생성',
        description: 'S3에 파일 업로드를 위한 Presigned URL을 생성합니다.',
      }),
      ApiOkResponse({
        description: 'Presigned URL이 성공적으로 생성됨',
        type: GeneratePresignedUrlResponseDto,
        isArray: true,
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
});
