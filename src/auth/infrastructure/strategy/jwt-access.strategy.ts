import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, JwtFromRequestFunction, Strategy } from 'passport-jwt';

interface JwtPayload {
  userId: number;
}

@Injectable()
export class JwtAccessStrategy extends PassportStrategy(Strategy, 'jwt-access') {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          try {
            return req.cookies?.accessToken as string;
          } catch (e: unknown) {
            console.log(e);
            throw new UnauthorizedException('유효하지 않은 refresh token 입니다.');
          }
        },
      ]) as JwtFromRequestFunction,
      ignoreExpiration: false,
      secretOrKey: configService.getOrThrow<string>('jwt.access.secret'),
    });
  }

  validate(payload: JwtPayload) {
    return payload;
  }
}
