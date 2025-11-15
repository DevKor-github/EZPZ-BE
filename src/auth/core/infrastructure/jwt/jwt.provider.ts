import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { JwtSignOptionsMapper, JwtVerifyOptionsMapper, TokenType } from './jwt.factory';
import { Injectable } from '@nestjs/common';
import { v4 as uuidV4 } from 'uuid';
import { JwtPayload } from './jwt-payload';
import { Role } from '../../domain/value-object/role';

@Injectable()
export class JwtProvider {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async generateToken(tokenType: TokenType, sub: string, roles: Role[]): Promise<{ token: string; jti: string }> {
    const jwtSignOptions = JwtSignOptionsMapper(this.configService)[tokenType];
    const jti = uuidV4();
    const payload = { sub, jti, roles } as JwtPayload;
    const token = await this.jwtService.signAsync(payload, jwtSignOptions);

    return { token, jti };
  }

  async verifyToken(token: string, tokenType: TokenType): Promise<any> {
    const jwtVerifyOptions = JwtVerifyOptionsMapper(this.configService)[tokenType];

    return this.jwtService.verifyAsync(token, jwtVerifyOptions);
  }

  async saveRefreshToken(): Promise<void> {}
}
