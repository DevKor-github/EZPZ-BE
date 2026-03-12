import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, JwtFromRequestFunction, Strategy } from 'passport-jwt';
import { CustomException } from 'src/shared/exception/custom-exception';
import { CustomExceptionCode } from 'src/shared/exception/custom-exception-code';
import { JwtPayload } from './jwt-payload';

function CreateJwtStrategy(strategyName: string, cookieName: string, secretKeyConfigPath: string) {
  @Injectable()
  abstract class JwtStrategy extends PassportStrategy(Strategy, strategyName) {
    constructor(readonly configService: ConfigService) {
      super({
        jwtFromRequest: ExtractJwt.fromExtractors([
          (req: Request) => {
            try {
              return req.cookies?.[cookieName] as string;
            } catch (e: unknown) {
              console.log(e);
              throw new CustomException(CustomExceptionCode.AUTH_INVALID_ACCESS_TOKEN);
            }
          },
        ]) as JwtFromRequestFunction,
        ignoreExpiration: false,
        secretOrKey: configService.getOrThrow<string>(secretKeyConfigPath),
      });
    }

    validate(payload: JwtPayload): JwtPayload {
      return payload;
    }
  }
  return JwtStrategy;
}

export function CreateJwtAccessStrategy(strategyName: string, cookieName: string) {
  return CreateJwtStrategy(strategyName, cookieName, 'jwt.access.secret');
}

export function CreateJwtRefreshStrategy(strategyName: string, cookieName: string) {
  return CreateJwtStrategy(strategyName, cookieName, 'jwt.refresh.secret');
}
