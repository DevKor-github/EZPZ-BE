import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { createDocs } from 'src/shared/core/presentation/base.docs';
import { UpdateOrganizationReqDto } from './dto/request/update-organization.request.dto';

export type OrganizationEndpoint = 'update';

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
});
