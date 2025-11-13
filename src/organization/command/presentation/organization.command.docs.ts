import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { createDocs } from 'src/shared/core/presentation/base.docs';
import { UpdateOrganizationDto } from './dto/request/update-organization.request.dto';

export type OrganizationCommandEndpoint = 'update';

export const OrganizationCommandDocs = createDocs<OrganizationCommandEndpoint>({
  update: () =>
    applyDecorators(
      ApiOperation({
        summary: 'organization 정보 수정',
        description: '조직의 이름과 연락처를 수정합니다.',
      }),
      ApiBody({
        description: 'organization 정보 수정 요청 DTO',
        type: UpdateOrganizationDto,
      }),
      ApiOkResponse({
        description: 'organization 정보 수정 성공',
      }),
      ApiUnauthorizedResponse({
        description: '유효하지 않은 access token',
      }),
    ),
});
