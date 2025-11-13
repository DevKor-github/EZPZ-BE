import { Inject, Injectable } from '@nestjs/common';
import { JwtProvider } from 'src/auth/core/infrastructure/jwt/jwt.provider';
import { AUTH_ORGANIZATION_STORE, AuthOrganizationStore } from '../../domain/auth-organization.store';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RenewTokenCommand } from './renew-token.command';
import { TokenType } from 'src/auth/core/infrastructure/jwt/jwt.factory';
import { CustomException } from 'src/shared/exception/custom-exception';
import { CustomExceptionCode } from 'src/shared/exception/custom-exception-code';
import { RenewTokenResponseDto } from './dto/renew-token.response.dto';
import { AuthOrganization } from '../../domain/auth-organization';

@Injectable()
@CommandHandler(RenewTokenCommand)
export class RenewTokenUseCase implements ICommandHandler<RenewTokenCommand> {
  constructor(
    @Inject(AUTH_ORGANIZATION_STORE)
    private readonly authOrganizationStore: AuthOrganizationStore,
    private readonly jwtProvider: JwtProvider,
  ) {}

  async execute(command: RenewTokenCommand): Promise<RenewTokenResponseDto> {
    const { organizationId, jti } = command;

    const authOrganization = await this.validateRefreshToken(organizationId, jti);
    const { accessToken, refreshToken, jti: newJti } = await this.generateTokens(organizationId);
    await this.saveRefreshToken(authOrganization, newJti);

    return { accessToken, refreshToken };
  }

  private async validateRefreshToken(organizationId: string, jti: string): Promise<AuthOrganization> {
    const authOrganization = await this.authOrganizationStore.loadByRefreshToken(jti);
    if (!authOrganization || authOrganization.organizationId.value !== organizationId) {
      throw new CustomException(CustomExceptionCode.AUTH_ORGANIZATION_INVALID_REFRESH_TOKEN);
    }

    return authOrganization;
  }

  private async generateTokens(
    organizationId: string,
  ): Promise<{ accessToken: string; refreshToken: string; jti: string }> {
    const { token: accessToken } = await this.jwtProvider.generateToken(TokenType.ACCESS, organizationId);
    const { token: refreshToken, jti } = await this.jwtProvider.generateToken(TokenType.REFRESH, organizationId);

    return { accessToken, refreshToken, jti };
  }

  private async saveRefreshToken(authOrganization: AuthOrganization, jti: string): Promise<void> {
    authOrganization.updateRefreshToken(jti);
    await this.authOrganizationStore.update(authOrganization);
  }
}
