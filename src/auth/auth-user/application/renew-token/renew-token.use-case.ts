import { Inject, Injectable } from '@nestjs/common';
import { TokenType } from 'src/auth/core/infrastructure/jwt/jwt.factory';
import { JwtProvider } from 'src/auth/core/infrastructure/jwt/jwt.provider';
import { RenewTokenRequestDto } from './dto/renew-token.request.dto';
import { RenewTokenResponseDto } from './dto/renew-token.response.dto';
import { CustomException } from 'src/shared/exception/custom-exception';
import { CustomExceptionCode } from 'src/shared/exception/custom-exception-code';
import { EventBus } from '@nestjs/cqrs';
import { AUTH_USER_REPOSITORY, AuthUserRepository } from '../../domain/auth-user.repository';

@Injectable()
export class RenewTokenUseCase {
  constructor(
    private readonly jwtProvider: JwtProvider,
    @Inject(AUTH_USER_REPOSITORY)
    private readonly authUserRepository: AuthUserRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute(reqeustDto: RenewTokenRequestDto): Promise<RenewTokenResponseDto> {
    const { userId, jti } = reqeustDto;
    const authUser = await this.authUserRepository.findByRefreshToken(jti);
    if (!authUser || userId != authUser.userId.value)
      throw new CustomException(CustomExceptionCode.AUTH_INVALID_REFRESH_TOKEN);

    const { token: accessToken } = await this.jwtProvider.generateToken(TokenType.ACCESS, userId);
    const { token: refreshToken, jti: newJti } = await this.jwtProvider.generateToken(TokenType.REFRESH, userId);

    authUser.updateRefreshToken(newJti, new Date());
    await this.authUserRepository.update(authUser);

    await this.eventBus.publishAll(authUser.pullDomainEvents());

    return { accessToken, refreshToken };
  }
}
