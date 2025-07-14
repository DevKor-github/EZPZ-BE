import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { createDocs } from 'src/shared/presentation/docs/base.docs';
import { GeneratePresignedUrlResponseDto } from '../application/generate-presigned-url/dto/generate-presigned-url.response.dto';
import { UpdateMediaRequestDto } from '../application/update/dto/update.request.dto';
import { CreateMediaRequestDto } from '../application/create/dto/create.request.dto';

export type MediaCommandEndpoint = 'presignedUrl' | 'create' | 'update';

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
      ApiBody({
        description: '미디어 생성 request dto',
        type: CreateMediaRequestDto,
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
  update: () =>
    applyDecorators(
      ApiOperation({
        summary: '미디어 수정',
        description: `
        S3에 파일 삭제, 순서 변경, 삽입을 수행

        1. POST /media/presigned-url 
            => S3에 파일 업로드를 위한 Presigned URL을 생성
            => [{presignedUrl, objectKey}] 받음
            => thumbnail과 일반 이미지의 presignedUrl이 구분되어 있음

        2. PUT https://presigendUrl~~~
            => 2번에서 받은 presignedUrl을 통해 파일 업로드
            => 성공 시 200 OK 응답

        3. PATCH /media/
            => 수정된 imageUrl 배열과 함께 api 요청
            => 삭제하고자 하는 이미지 경로는 배열에서 제외
        
        4. PATCH /article/{articleId}
            => 이미지를 제외한 게시글 정보 수정 api 요청
        `,
      }),
      ApiBody({
        description: '미디어 수정 request dto',
        type: UpdateMediaRequestDto,
      }),
      ApiOkResponse({
        description: '미디어가 성공적으로 수정됨',
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
