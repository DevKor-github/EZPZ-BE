import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { JwtPayload } from 'iam/auth/auth-core/infrastructure/jwt/jwt-payload';

export interface AdminPayload {
  adminId: string;
  jti: string;
}

export const Admin = createParamDecorator((data: unknown, ctx: ExecutionContext): AdminPayload => {
  const request = ctx.switchToHttp().getRequest<Request>();
  const { sub, jti } = request.user as JwtPayload;

  return { adminId: sub, jti };
});
