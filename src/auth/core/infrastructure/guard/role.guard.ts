import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from 'src/shared/core/presentation/role.decorator';
import { JwtPayload } from '../jwt/jwt-payload';
import { Request } from 'express';
import { Role } from '../../domain/value-object/role';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(ctx: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [ctx.getHandler(), ctx.getClass()]);

    if (!requiredRoles) return true;

    const request = ctx.switchToHttp().getRequest<Request>();
    const { roles } = request.user as JwtPayload;

    console.log('Required Roles:', roles);

    return requiredRoles.some((role: Role) => roles.includes(role));
  }
}
