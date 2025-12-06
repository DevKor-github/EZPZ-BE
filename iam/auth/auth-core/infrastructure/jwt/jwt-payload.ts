import { Role } from '../../domain/value-object/role';

export interface JwtPayload {
  sub: string;
  jti: string;
  roles: Role[];
}
