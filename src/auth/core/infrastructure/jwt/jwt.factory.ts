// jwt-token-options.factory.ts
import { ConfigService } from '@nestjs/config';
import { JwtSignOptions, JwtVerifyOptions } from '@nestjs/jwt';

export enum TokenType {
  ACCESS = 'access',
  REFRESH = 'refresh',
}

export const JwtSignOptionsMapper = (config: ConfigService): Record<TokenType, JwtSignOptions> => ({
  [TokenType.ACCESS]: {
    secret: config.getOrThrow<string>('jwt.access.secret'),
    expiresIn: config.getOrThrow<number>('jwt.access.expiration'),
  },
  [TokenType.REFRESH]: {
    secret: config.getOrThrow<string>('jwt.refresh.secret'),
    expiresIn: config.getOrThrow<number>('jwt.refresh.expiration'),
  },
});

export const JwtVerifyOptionsMapper = (config: ConfigService): Record<TokenType, JwtVerifyOptions> => ({
  [TokenType.ACCESS]: {
    secret: config.getOrThrow<string>('jwt.access.secret'),
  },
  [TokenType.REFRESH]: {
    secret: config.getOrThrow<string>('jwt.refresh.secret'),
  },
});
