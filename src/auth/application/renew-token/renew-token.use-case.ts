import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthRepository } from 'src/auth/domain/repository/auth.repository';
import { TokenType } from 'src/auth/infrastructure/factory/jwt.factory';
import { AuthEntity } from 'src/auth/infrastructure/orm-entity/auth.entity';
import { JwtProvider } from 'src/auth/infrastructure/provider/jwt.provider';
import { RenewTokenRequestDto } from './dto/renew-token.request.dto';
import { RenewTokenResponseDto } from './dto/renew-token.response.dto';

@Injectable()
export class RenewTokenUseCase {
  constructor(
    private readonly jwtProvider: JwtProvider,
    @InjectRepository(AuthEntity)
    private readonly authRepository: AuthRepository,
  ) {}

  async execute(reqeustDto: RenewTokenRequestDto): Promise<RenewTokenResponseDto> {
    const { userId, jti } = reqeustDto;
    const auth = await this.authRepository.findByRefreshToken(jti);
    if (!auth || userId != auth.userId.value) throw new UnauthorizedException('유효하지 않은 refresh token 입니다. a');

    const { token: accessToken } = await this.jwtProvider.generateToken(TokenType.ACCESS, userId);
    const { token: refreshToken, jti: newJti } = await this.jwtProvider.generateToken(TokenType.REFRESH, userId);

    auth.updateRefreshToken(newJti, new Date());
    await this.authRepository.update(auth);

    return { accessToken, refreshToken };
  }
}
