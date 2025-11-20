import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { CustomException } from 'src/shared/exception/custom-exception';
import { CustomExceptionCode } from 'src/shared/exception/custom-exception-code';
import { JwtPayload } from './jwt-payload';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          try {
            return req.cookies?.refreshToken as string;
          } catch (e: unknown) {
            console.log(e);
            throw new CustomException(CustomExceptionCode.AUTH_INVALID_REFRESH_TOKEN);
          }
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.getOrThrow<string>('jwt.refresh.secret'),
    });
  }

  validate(payload: JwtPayload): JwtPayload {
    return payload;
  }
}
