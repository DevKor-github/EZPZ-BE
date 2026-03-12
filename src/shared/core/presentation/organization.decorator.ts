import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { JwtPayload } from 'src/iam/auth/auth-core/infrastructure/jwt/jwt-payload';

export interface OrganizationPayload {
  organizationId: string;
  jti: string;
}

export const Organization = createParamDecorator((data: unknown, ctx: ExecutionContext): OrganizationPayload => {
  const request = ctx.switchToHttp().getRequest<Request>();
  const { sub, jti } = request.user as JwtPayload;

  return { organizationId: sub, jti };
});
