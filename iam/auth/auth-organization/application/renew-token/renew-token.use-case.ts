import { Inject, Injectable } from '@nestjs/common';
import { AUTH_ORGANIZATION_STORE, AuthOrganizationStore } from '../../domain/auth-organization.store';
import { RenewTokenCommand } from './renew-token.command';
import { CustomException } from 'src/shared/exception/custom-exception';
import { CustomExceptionCode } from 'src/shared/exception/custom-exception-code';
import { AuthOrganization } from '../../domain/auth-organization';
import { RenewTokenResult } from './renew-token.response.dto';
import { JwtProvider } from 'iam/auth/auth-core/infrastructure/jwt/jwt.provider';
import { TokenType } from 'iam/auth/auth-core/infrastructure/jwt/jwt.factory';
import { Role } from 'iam/auth/auth-core/domain/value-object/role';

@Injectable()
export class RenewTokenUseCase {
  constructor(
    @Inject(AUTH_ORGANIZATION_STORE)
    private readonly authOrganizationStore: AuthOrganizationStore,
    private readonly jwtProvider: JwtProvider,
  ) {}

  async execute(command: RenewTokenCommand): Promise<RenewTokenResult> {
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
    const { token: accessToken } = await this.jwtProvider.generateToken(TokenType.ACCESS, organizationId, [
      Role.ORGANIZATION,
    ]);
    const { token: refreshToken, jti } = await this.jwtProvider.generateToken(TokenType.REFRESH, organizationId, [
      Role.ORGANIZATION,
    ]);

    return { accessToken, refreshToken, jti };
  }

  private async saveRefreshToken(authOrganization: AuthOrganization, jti: string): Promise<void> {
    authOrganization.updateRefreshToken(jti);
    await this.authOrganizationStore.update(authOrganization);
  }
}
