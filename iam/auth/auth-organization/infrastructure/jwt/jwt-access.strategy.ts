import { Injectable } from '@nestjs/common';
import { CreateJwtAccessStrategy } from 'iam/auth/auth-core/infrastructure/jwt/base-jwt.strategy';

@Injectable()
export class JwtOrganizationAccessStrategy extends CreateJwtAccessStrategy(
  'jwt-organization-access',
  'organizationAccessToken',
) {}
