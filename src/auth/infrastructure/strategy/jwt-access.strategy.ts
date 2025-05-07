import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

interface JwtPayload {
  userId: number;
}

@Injectable()
export class JwtAccessStrategy extends PassportStrategy(Strategy, 'jwt-access') {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors<any>([
        (req: Request): any => {
          try {
            return req.cookies.accessToken;
          } catch (e: any) {
            console.log(e);
            throw new UnauthorizedException('유효하지 않은 access token 입니다.');
          }
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.getOrThrow<string>('jwt.access.secret'),
    });
  }

  validate(payload: JwtPayload) {
    return payload;
  }
}
