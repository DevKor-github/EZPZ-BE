import { Inject, Injectable } from '@nestjs/common';
import { CustomException } from 'src/shared/exception/custom-exception';
import { CustomExceptionCode } from 'src/shared/exception/custom-exception-code';
import { EventBus } from '@nestjs/cqrs';
import { AUTH_USER_STORE, AuthUserStore } from '../../domain/auth-user.repository';
import { RenewTokenCommand } from './renew-token.command';
import { RenewTokenResult } from './renew-token.result';
import { JwtProvider } from 'src/iam/auth/auth-core/infrastructure/jwt/jwt.provider';
import { Role } from 'src/iam/auth/auth-core/domain/value-object/role';
import { TokenType } from 'src/iam/auth/auth-core/infrastructure/jwt/jwt.factory';

@Injectable()
export class RenewTokenUseCase {
  constructor(
    private readonly jwtProvider: JwtProvider,
    @Inject(AUTH_USER_STORE)
    private readonly authUserStore: AuthUserStore,
    private readonly eventBus: EventBus,
  ) {}

  async execute(reqeustDto: RenewTokenCommand): Promise<RenewTokenResult> {
    const { userId, jti } = reqeustDto;
    const authUser = await this.authUserStore.findByRefreshToken(jti);
    if (!authUser || userId != authUser.userId.value)
      throw new CustomException(CustomExceptionCode.AUTH_INVALID_REFRESH_TOKEN);

    const { token: accessToken } = await this.jwtProvider.generateToken(TokenType.ACCESS, userId, [Role.USER]);
    const { token: refreshToken, jti: newJti } = await this.jwtProvider.generateToken(TokenType.REFRESH, userId, [
      Role.USER,
    ]);

    authUser.updateRefreshToken(newJti, new Date());
    await this.authUserStore.update(authUser);

    await this.eventBus.publishAll(authUser.pullDomainEvents());

    return { accessToken, refreshToken };
  }
}
