import { Inject, Injectable } from '@nestjs/common';
import { AUTH_ADMIN_REPOSITORY, AuthAdminRepository } from '../../domain/auth-admin.repository';
import { AdminLoginCommand } from './login.command';
import { PASSWORD_HASHER, PasswordHasher } from 'src/iam/auth/auth-core/domain/password-hasher';
import { CustomException } from 'src/shared/exception/custom-exception';
import { CustomExceptionCode } from 'src/shared/exception/custom-exception-code';
import { TokenType } from 'src/iam/auth/auth-core/infrastructure/jwt/jwt.factory';
import { AuthAdmin } from '../../domain/auth-admin';
import { Role } from 'src/iam/auth/auth-core/domain/value-object/role';
import { JwtProvider } from 'src/iam/auth/auth-core/infrastructure/jwt/jwt.provider';
import { AdminLoginResult } from './login.result';

@Injectable()
export class AdminLoginUseCase {
  constructor(
    @Inject(AUTH_ADMIN_REPOSITORY)
    private readonly authAdminRepository: AuthAdminRepository,
    @Inject(PASSWORD_HASHER)
    private readonly passwordHasher: PasswordHasher,
    private readonly jwtProvider: JwtProvider,
  ) {}

  async execute(command: AdminLoginCommand): Promise<AdminLoginResult> {
    const { accountId, password } = command;

    const authAdmin = await this.validateAccount(accountId.trim(), password.trim());
    const { accessToken } = await this.generateToken(authAdmin.adminId.value);

    return { accessToken };
  }

  private async validateAccount(accountId: string, password: string): Promise<AuthAdmin> {
    const authAdmin = await this.authAdminRepository.loadByAccountId(accountId);
    if (!authAdmin) throw new CustomException(CustomExceptionCode.AUTH_ADMIN_NOT_FOUND);

    const isPasswordValid = await this.passwordHasher.compare(password, authAdmin.passwordHash.value);
    if (!isPasswordValid) throw new CustomException(CustomExceptionCode.AUTH_INVALID_PASSWORD);

    return authAdmin;
  }

  private async generateToken(adminId: string): Promise<{ accessToken: string }> {
    const { token: accessToken } = await this.jwtProvider.generateToken(TokenType.ACCESS, adminId, [Role.ADMIN]);

    return { accessToken };
  }
}
