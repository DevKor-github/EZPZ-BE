import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { User, UserPayload } from 'src/shared/core/presentation/user.decorator';
import { UserModel } from '../domain/user.model';
import { GetMyInfoUseCase } from '../application/get-my-info/get-my-info.use-case';
import { UserQueryDocs } from './user.query.docs';

@ApiTags('user')
@Controller('user')
export class UserQueryController {
  constructor(private readonly getMyInfoUseCase: GetMyInfoUseCase) {}

  @Get('me')
  @UseGuards(AuthGuard('jwt-access'))
  @UserQueryDocs('getMyInfo')
  async getMyInfo(@User() user: UserPayload): Promise<UserModel> {
    return await this.getMyInfoUseCase.execute({ userId: user.userId });
  }
}
