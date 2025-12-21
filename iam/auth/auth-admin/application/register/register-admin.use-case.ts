import { Inject, Injectable } from '@nestjs/common';
import { AUTH_ADMIN_REPOSITORY, AuthAdminRepository } from '../../domain/auth-admin.repository';
import { JwtProvider } from 'iam/auth/auth-core/infrastructure/jwt/jwt.provider';
import { RegisterAdminCommand } from './register-admin.command';
import { RegisterAdminResult } from './register-admin.result';
import { CustomException } from 'src/shared/exception/custom-exception';
import { CustomExceptionCode } from 'src/shared/exception/custom-exception-code';
import { AuthAdmin } from '../../domain/auth-admin';
import { TokenType } from 'iam/auth/auth-core/infrastructure/jwt/jwt.factory';
import { Role } from 'iam/auth/auth-core/domain/value-object/role';
import { Identifier } from 'src/shared/core/domain/identifier';
import { AccountId } from 'iam/auth/auth-organization/domain/vo/account-id';
import { PasswordHash } from 'iam/auth/auth-core/domain/value-object/password-hash';
import { CreateAdminUseCase } from 'iam/admin/application/create/create.use-case';
import { CreateAdminCommand } from 'iam/admin/application/create/create.command';
import { Transactional } from '@mikro-orm/core';
import { PASSWORD_HASHER, PasswordHasher } from 'iam/auth/auth-core/domain/password-hasher';

@Injectable()
export class RegisterAdminUseCase {
  constructor(
    @Inject(AUTH_ADMIN_REPOSITORY)
    private readonly authAdminRepository: AuthAdminRepository,
    @Inject(PASSWORD_HASHER)
    private readonly passwordHasher: PasswordHasher,
    private readonly jwtProvider: JwtProvider,
    private readonly createAdminUseCase: CreateAdminUseCase,
  ) {}

  @Transactional()
  async execute(command: RegisterAdminCommand): Promise<RegisterAdminResult> {
    const { accountId, password, name } = command;
    const existingAdmin = await this.authAdminRepository.loadByAccountId(accountId);
    if (existingAdmin) throw new CustomException(CustomExceptionCode.AUTH_ADMIN_ALREADY_EXISTS);

    const adminId = await this.createAdmin(name);
    const authAdmin = await this.createAuthAdmin(accountId, password, adminId);
    const accessToken = await this.generateToken(authAdmin.adminId.value);

    return { accessToken };
  }

  private async createAdmin(name: string): Promise<string> {
    const { adminId } = await this.createAdminUseCase.execute(new CreateAdminCommand(name));
    return adminId;
  }

  private async createAuthAdmin(accountId: string, password: string, adminId: string): Promise<AuthAdmin> {
    const passwordHash = await this.passwordHasher.hash(password);

    const authAdmin = AuthAdmin.create({
      id: Identifier.create(),
      accountId: AccountId.create(accountId),
      passwordHash: PasswordHash.create(passwordHash),
      adminId: Identifier.from(adminId),
      createdAt: new Date(),
      updatedAt: new Date(),
      isDeleted: false,
      deletedAt: null,
    });

    await this.authAdminRepository.save(authAdmin);

    return authAdmin;
  }

  private async generateToken(adminId: string): Promise<string> {
    const { token: accessToken } = await this.jwtProvider.generateToken(TokenType.ACCESS, adminId, [Role.ADMIN]);
    return accessToken;
  }
}
