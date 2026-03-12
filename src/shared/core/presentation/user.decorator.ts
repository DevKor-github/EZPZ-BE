import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { JwtPayload } from 'src/iam/auth/auth-core/infrastructure/jwt/jwt-payload';

export interface UserPayload {
  userId: string;
  jti: string;
}

export const User = createParamDecorator((data: unknown, ctx: ExecutionContext): UserPayload => {
  const request = ctx.switchToHttp().getRequest<Request>();
  const { sub, jti } = request.user as JwtPayload;

  return { userId: sub, jti };
});
