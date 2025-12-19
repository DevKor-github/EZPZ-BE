import { Inject, Injectable } from '@nestjs/common';
import { LoginCommand } from './login.command';
import { AUTH_ORGANIZATION_STORE, AuthOrganizationStore } from '../../domain/auth-organization.store';
import { CustomException } from 'src/shared/exception/custom-exception';
import { CustomExceptionCode } from 'src/shared/exception/custom-exception-code';
import { AuthOrganization } from '../../domain/auth-organization';
import { LoginResult } from './login.result';
import { JwtProvider } from 'iam/auth/auth-core/infrastructure/jwt/jwt.provider';
import { Role } from 'iam/auth/auth-core/domain/value-object/role';
import { TokenType } from 'iam/auth/auth-core/infrastructure/jwt/jwt.factory';
import { PASSWORD_HASHER, PasswordHasher } from 'iam/auth/auth-core/domain/password-hasher';

@Injectable()
export class LoginUseCase {
  constructor(
    @Inject(AUTH_ORGANIZATION_STORE)
    private readonly authOrganizationStore: AuthOrganizationStore,
    @Inject(PASSWORD_HASHER)
    private readonly passwordHasher: PasswordHasher,
    private readonly jwtProvider: JwtProvider,
  ) {}

  async execute(command: LoginCommand): Promise<LoginResult> {
    const { accountId, password } = command;

    const authOrganization = await this.validateAccount(accountId.trim(), password.trim());
    const { accessToken, refreshToken, jti } = await this.generateTokens(authOrganization.organizationId.value);
    await this.saveRefreshToken(authOrganization, jti);

    return { accessToken, refreshToken };
  }

  private async validateAccount(accountId: string, password: string): Promise<AuthOrganization> {
    const authOrganization = await this.authOrganizationStore.loadByAccountId(accountId);
    if (!authOrganization) throw new CustomException(CustomExceptionCode.AUTH_ORGANIZATION_NOT_FOUND);

    const isPasswordValid = await this.passwordHasher.compare(password, authOrganization.passwordHash.value);
    if (!isPasswordValid) throw new CustomException(CustomExceptionCode.AUTH_INVALID_PASSWORD);

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
