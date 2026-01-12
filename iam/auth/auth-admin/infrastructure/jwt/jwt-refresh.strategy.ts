import { Injectable } from '@nestjs/common';
import { CreateJwtRefreshStrategy } from 'iam/auth/auth-core/infrastructure/jwt/base-jwt.strategy';

@Injectable()
export class JwtAdminRefreshStrategy extends CreateJwtRefreshStrategy('jwt-admin-refresh', 'adminRefreshToken') {}
