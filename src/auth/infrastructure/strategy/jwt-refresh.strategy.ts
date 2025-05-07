import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

// refresh token 전용 로직 추가 예정
interface JwtPayload {
  userId: number;
  // jti: string;
}

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors<any>([
        (req: Request): any => {
          try {
            return req.cookies.refreshToken;
          } catch (e: any) {
            console.log(e);
            throw new UnauthorizedException('유효하지 않은 refresh token 입니다.');
          }
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.getOrThrow<string>('jwt.refresh.secret'),
    });
  }

  validate(payload: JwtPayload) {
    return payload;
  }
}
