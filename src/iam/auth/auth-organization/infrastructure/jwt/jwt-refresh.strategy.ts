import { Injectable } from '@nestjs/common';
import { CreateJwtRefreshStrategy } from 'src/iam/auth/auth-core/infrastructure/jwt/base-jwt.strategy';

@Injectable()
export class JwtOrganizationRefreshStrategy extends CreateJwtRefreshStrategy(
  'jwt-organization-refresh',
  'organizationRefreshToken',
) {}
