import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { JwtTokenOptions, TokenType } from '../factory/jwt.factory';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtProvider {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async generateToken(tokenType: TokenType, userId: string): Promise<string> {
    const jwtSignOptions = JwtTokenOptions(this.configService)[tokenType];
    const payload = { userId };

    return this.jwtService.signAsync(payload, jwtSignOptions);
  }

  async verifyToken(token: string, tokenType: TokenType): Promise<any> {
    const jwtSignOptions = JwtTokenOptions(this.configService)[tokenType];

    return this.jwtService.verifyAsync(token, jwtSignOptions);
  }

  async saveRefreshToken(): Promise<void> {}
}
