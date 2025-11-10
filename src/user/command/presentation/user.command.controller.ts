import { Controller, Delete, HttpStatus, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { User, UserPayload } from 'src/shared/core/presentation/user.decorator';
import { UserCommandDocs } from './user.command.docs';
import { CommandBus } from '@nestjs/cqrs';
import { DeleteMyInfoCommand } from '../application/delete/delete.command';
import { Response } from 'express';
import { accessTokenCookieOptions, refreshTokenCookieOptions } from 'src/shared/config/cookie.config';

@ApiTags('user')
@Controller('user')
export class UserCommandController {
  constructor(private readonly commandBus: CommandBus) {}
  @Delete('me')
  @UseGuards(AuthGuard('jwt-access'))
  @UserCommandDocs('deleteMyInfo')
  async deleteMyInfo(@User() user: UserPayload, @Res() res: Response) {
    const command = new DeleteMyInfoCommand(user.userId);
    await this.commandBus.execute(command);

    res.clearCookie('accessToken', accessTokenCookieOptions);
    res.clearCookie('refreshToken', refreshTokenCookieOptions);

    res.status(HttpStatus.NO_CONTENT).send();
  }
}
