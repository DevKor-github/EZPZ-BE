import { Injectable } from '@nestjs/common';
import { TokenType } from 'src/auth/infrastructure/factory/jwt.factory';
import { JwtProvider } from 'src/auth/infrastructure/provider/jwt.provider';

@Injectable()
export class RenewTokenUseCase {
  constructor(private readonly jwtProvider: JwtProvider) {}

  async execute(userId: number) {
    console.log(userId);
    // DB에 저장된 refresh token을 가져와 userId와 비교

    const accessToken = await this.jwtProvider.generateToken(TokenType.ACCESS, userId);
    const refreshToken = await this.jwtProvider.generateToken(TokenType.REFRESH, userId);

    // DB에 새 refresh token 저장

    return { accessToken, refreshToken };
  }
}
