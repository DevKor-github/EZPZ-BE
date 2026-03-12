import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { createDocs } from 'src/shared/core/presentation/base.docs';
import { UpdateOrganizationReqDto } from './dto/request/update-organization.request.dto';
import { OrganizationView } from '../domain/organization.view';

export type OrganizationEndpoint = 'update' | 'get';

export const OrganizationDocs = createDocs<OrganizationEndpoint>({
  update: () =>
    applyDecorators(
      ApiOperation({
        summary: 'organization 정보 수정',
        description: '조직의 이름과 연락처를 수정합니다.',
      }),
      ApiBody({
        description: 'organization 정보 수정 요청 DTO',
        type: UpdateOrganizationReqDto,
      }),
      ApiOkResponse({
        description: 'organization 정보 수정 성공',
      }),
      ApiUnauthorizedResponse({
        description: '유효하지 않은 access token',
      }),
    ),
  get: () =>
    applyDecorators(
      ApiOperation({
        summary: 'organization 정보 조회',
        description: '조직의 정보를 조회합니다.',
      }),
      ApiOkResponse({
        description: 'organization 정보 조회 성공',
        type: OrganizationView,
      }),
      ApiNotFoundResponse({
        description: 'organization을 찾을 수 없음',
      }),
      ApiUnauthorizedResponse({
        description: '유효하지 않은 access token',
      }),
    ),
});
