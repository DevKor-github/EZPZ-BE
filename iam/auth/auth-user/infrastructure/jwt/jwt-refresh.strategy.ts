import { Injectable } from '@nestjs/common';
import { CreateJwtRefreshStrategy } from 'iam/auth/auth-core/infrastructure/jwt/base-jwt.strategy';

@Injectable()
export class JwtUserRefreshStrategy extends CreateJwtRefreshStrategy('jwt-user-refresh', 'refreshToken') {}
