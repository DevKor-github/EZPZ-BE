import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { JwtTokenOptions, TokenType } from '../factory/jwt.factory';
import { Injectable } from '@nestjs/common';
import { v4 as uuidV4 } from 'uuid';

@Injectable()
export class JwtProvider {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async generateToken(tokenType: TokenType, userId: string): Promise<{ token: string; jti: string }> {
    const jwtSignOptions = JwtTokenOptions(this.configService)[tokenType];
    const jti = uuidV4();
    const payload = { userId, jti };
    const token = await this.jwtService.signAsync(payload, jwtSignOptions);

    return { token, jti };
  }

  async verifyToken(token: string, tokenType: TokenType): Promise<any> {
    const jwtSignOptions = JwtTokenOptions(this.configService)[tokenType];

    return this.jwtService.verifyAsync(token, jwtSignOptions);
  }

  async saveRefreshToken(): Promise<void> {}
}
