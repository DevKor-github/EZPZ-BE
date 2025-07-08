// jwt-token-options.factory.ts
import { ConfigService } from '@nestjs/config';
import { JwtSignOptions } from '@nestjs/jwt';

export enum TokenType {
  ACCESS = 'access',
  REFRESH = 'refresh',
}

export const JwtTokenOptions = (config: ConfigService): Record<TokenType, JwtSignOptions> => ({
  [TokenType.ACCESS]: {
    secret: config.getOrThrow<string>('jwt.access.secret'),
    expiresIn: config.getOrThrow<string>('jwt.access.expiration'),
  },
  [TokenType.REFRESH]: {
    secret: config.getOrThrow<string>('jwt.refresh.secret'),
    expiresIn: config.getOrThrow<string>('jwt.refresh.expiration'),
  },
});
