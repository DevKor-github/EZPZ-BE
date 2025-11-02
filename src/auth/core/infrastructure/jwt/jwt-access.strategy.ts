import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, JwtFromRequestFunction, Strategy } from 'passport-jwt';
import { CustomException } from 'src/shared/exception/custom-exception';
import { CustomExceptionCode } from 'src/shared/exception/custom-exception-code';

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
            throw new CustomException(CustomExceptionCode.AUTH_INVALID_ACCESS_TOKEN);
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
