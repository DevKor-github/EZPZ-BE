import { Body, Controller, HttpStatus, Post, Res, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateAuthOrganizationUseCase } from '../application/create/create.use-case';
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
import { RolesGuard } from 'src/auth/core/infrastructure/guard/role.guard';
import { Role } from 'src/auth/core/domain/value-object/role';

@ApiTags('auth-organization')
@Controller('auth/organization')
export class AuthOrganizationController {
  constructor(
    private readonly createAuthOrganizationUseCase: CreateAuthOrganizationUseCase,
    private readonly renewTokenUseCase: RenewTokenUseCase,
    private readonly loginUseCase: LoginUseCase,
    private readonly logoutUseCase: LogoutUseCase,
    private readonly checkAccountIdUseCase: CheckAccountIdUseCase,
  ) {}

  @Post('register')
  @AuthOrganizationDocs('register')
  async registerOrganization(@Body() dto: RegisterOrganizationRequestDto) {
    await this.createAuthOrganizationUseCase.execute({
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

    res.cookie('accessToken', accessToken, accessTokenCookieOptions);
    res.cookie('refreshToken', refreshToken, refreshTokenCookieOptions);

    res.status(HttpStatus.OK).send();
  }

  @Post('refresh')
  @UseGuards(AuthGuard('jwt-refresh'), RolesGuard)
  @Roles(Role.ORGANIZATION)
  @AuthOrganizationDocs('refresh')
  async renewToken(@Organization() organization: OrganizationPayload, @Res() res: Response) {
    const { organizationId, jti } = organization;
    const { accessToken, refreshToken } = await this.renewTokenUseCase.execute({
      organizationId: organizationId,
      jti: jti,
    });

    res.cookie('accessToken', accessToken, accessTokenCookieOptions);
    res.cookie('refreshToken', refreshToken, refreshTokenCookieOptions);

    res.status(HttpStatus.OK).send();
  }

  @Post('logout')
  @UseGuards(AuthGuard('jwt-access'), RolesGuard)
  @Roles(Role.ORGANIZATION)
  @AuthOrganizationDocs('logout')
  async logout(@Organization() organization: OrganizationPayload, @Res() res: Response) {
    await this.logoutUseCase.execute({ organizationId: organization.organizationId });

    res.clearCookie('accessToken', accessTokenCookieOptions);
    res.clearCookie('refreshToken', refreshTokenCookieOptions);

    res.status(HttpStatus.OK).send();
  }
}
