import { Inject, Injectable } from '@nestjs/common';
import { AUTH_REPOSITORY, AuthRepository } from 'src/auth/domain/repository/auth.repository';
import { TokenType } from 'src/auth/infrastructure/jwt/jwt.factory';
import { JwtProvider } from 'src/auth/infrastructure/jwt/jwt.provider';
import { RenewTokenRequestDto } from './dto/renew-token.request.dto';
import { RenewTokenResponseDto } from './dto/renew-token.response.dto';
import { CustomException } from 'src/shared/exception/custom-exception';
import { CustomExceptionCode } from 'src/shared/exception/custom-exception-code';
import { EventBus } from '@nestjs/cqrs';

@Injectable()
export class RenewTokenUseCase {
  constructor(
    private readonly jwtProvider: JwtProvider,
    @Inject(AUTH_REPOSITORY)
    private readonly authRepository: AuthRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute(reqeustDto: RenewTokenRequestDto): Promise<RenewTokenResponseDto> {
    const { userId, jti } = reqeustDto;
    const auth = await this.authRepository.findByRefreshToken(jti);
    if (!auth || userId != auth.userId.value) throw new CustomException(CustomExceptionCode.AUTH_INVALID_REFRESH_TOKEN);

    const { token: accessToken } = await this.jwtProvider.generateToken(TokenType.ACCESS, userId);
    const { token: refreshToken, jti: newJti } = await this.jwtProvider.generateToken(TokenType.REFRESH, userId);

    auth.updateRefreshToken(newJti, new Date());
    await this.authRepository.update(auth);

    await this.eventBus.publishAll(auth.pullDomainEvents());

    return { accessToken, refreshToken };
  }
}
