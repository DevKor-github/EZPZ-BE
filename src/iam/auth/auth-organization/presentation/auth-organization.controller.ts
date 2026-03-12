import { Body, Controller, Delete, HttpStatus, Patch, Post, Res, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RegisterOrganizationRequestDto } from './dto/request/register-organization.request.dto';
import { Response } from 'express';
import { RenewTokenUseCase } from '../application/renew-token/renew-token.use-case';
import { accessTokenCookieOptions, refreshTokenCookieOptions } from 'src/shared/config/cookie.config';
import { LogoutUseCase } from '../application/logout/logout.use-case';
import { LoginRequestDto } from './dto/request/login.request.dto';
import { LoginUseCase } from '../application/login/login.use-case';
import { AuthGuard } from '@nestjs/passport';
import { AuthOrganizationDocs } from './auth-organization.docs';
import { CheckAccountIdRequestDto } from './dto/request/check-account-id.request.dto';
import { CheckAccountIdUseCase } from '../application/check-account-id/check-account-id.use-case';
import { CheckAccountIdResponseDto } from './dto/response/check-account-id.response.dto';
import { Organization, OrganizationPayload } from 'src/shared/core/presentation/organization.decorator';
import { Roles } from 'src/shared/core/presentation/role.decorator';
import { Role } from 'src/iam/auth/auth-core/domain/value-object/role';
import { RolesGuard } from 'src/iam/auth/auth-core/infrastructure/guard/role.guard';
import { RegisterOrganizationUseCase } from '../application/register-organization/register-organization.use-case';
import { WithdrawOrganizationUseCase } from '../application/withdraw/withdraw.use-case';
import { ChangeOrganizationPasswordUseCase } from '../application/change-password/change-password.use-case';
import { ChangeOrganizationPasswordRequestDto } from './dto/request/change-password.request.dto';

@ApiTags('auth-organization')
@Controller('auth/organization')
export class AuthOrganizationController {
  constructor(
    private readonly registerOrganizationUseCase: RegisterOrganizationUseCase,
    private readonly renewTokenUseCase: RenewTokenUseCase,
    private readonly loginUseCase: LoginUseCase,
    private readonly logoutUseCase: LogoutUseCase,
    private readonly checkAccountIdUseCase: CheckAccountIdUseCase,
    private readonly withdrawOrganizationUseCase: WithdrawOrganizationUseCase,
    private readonly changeOrganizationPasswordUseCase: ChangeOrganizationPasswordUseCase,
  ) {}

  @Post('register')
  @AuthOrganizationDocs('register')
  async registerOrganization(@Body() dto: RegisterOrganizationRequestDto) {
    await this.registerOrganizationUseCase.execute({
      accountId: dto.accountId,
      password: dto.password,
      name: dto.name,
      contact: dto.contact,
    });
  }

  @Post('check-account-id')
  @AuthOrganizationDocs('checkAccountId')
  async checkAccountId(@Body() dto: CheckAccountIdRequestDto): Promise<CheckAccountIdResponseDto> {
    const isDuplicated = await this.checkAccountIdUseCase.execute({ accountId: dto.accountId });

    return { isDuplicated };
  }

  @Post('login')
  @AuthOrganizationDocs('login')
  async login(@Body() dto: LoginRequestDto, @Res() res: Response) {
    const { accessToken, refreshToken } = await this.loginUseCase.execute({
      accountId: dto.accountId,
      password: dto.password,
    });

    res.cookie('organizationAccessToken', accessToken, accessTokenCookieOptions);
    res.cookie('organizationRefreshToken', refreshToken, refreshTokenCookieOptions);

    res.status(HttpStatus.OK).send();
  }

  @Post('refresh')
  @UseGuards(AuthGuard('jwt-organization-refresh'), RolesGuard)
  @Roles(Role.ORGANIZATION)
  @AuthOrganizationDocs('refresh')
  async renewToken(@Organization() organization: OrganizationPayload, @Res() res: Response) {
    const { organizationId, jti } = organization;
    const { accessToken, refreshToken } = await this.renewTokenUseCase.execute({
      organizationId: organizationId,
      jti: jti,
    });

    res.cookie('organizationAccessToken', accessToken, accessTokenCookieOptions);
    res.cookie('organizationRefreshToken', refreshToken, refreshTokenCookieOptions);

    res.status(HttpStatus.OK).send();
  }

  @Post('logout')
  @UseGuards(AuthGuard('jwt-organization-access'), RolesGuard)
  @Roles(Role.ORGANIZATION)
  @AuthOrganizationDocs('logout')
  async logout(@Organization() organization: OrganizationPayload, @Res() res: Response) {
    await this.logoutUseCase.execute({ organizationId: organization.organizationId });

    res.clearCookie('organizationAccessToken', accessTokenCookieOptions);
    res.clearCookie('organizationRefreshToken', refreshTokenCookieOptions);

    res.status(HttpStatus.OK).send();
  }

  @Delete('withdraw')
  @UseGuards(AuthGuard('jwt-organization-access'), RolesGuard)
  @Roles(Role.ORGANIZATION)
  @AuthOrganizationDocs('withdraw')
  async withdraw(@Organization() organization: OrganizationPayload, @Res() res: Response) {
    await this.withdrawOrganizationUseCase.execute({ organizationId: organization.organizationId });

    res.clearCookie('organizationAccessToken', accessTokenCookieOptions);
    res.clearCookie('organizationRefreshToken', refreshTokenCookieOptions);

    res.status(HttpStatus.OK).send();
  }

  @Patch('change-password')
  @UseGuards(AuthGuard('jwt-organization-access'), RolesGuard)
  @Roles(Role.ORGANIZATION)
  @AuthOrganizationDocs('changePassword')
  async changePassword(
    @Organization() organization: OrganizationPayload,
    @Body() dto: ChangeOrganizationPasswordRequestDto,
    @Res() res: Response,
  ) {
    await this.changeOrganizationPasswordUseCase.execute({
      organizationId: organization.organizationId,
      currentPassword: dto.currentPassword,
      newPassword: dto.newPassword,
    });

    res.status(HttpStatus.OK).send();
  }
}
