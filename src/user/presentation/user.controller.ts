import { Controller, Delete, Get, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetMyInfoUseCase } from '../application/get-my-info/get-my-info.use-case';
import { AuthGuard } from '@nestjs/passport';
import { User, UserPayload } from 'src/shared/presentation/decorator/user.decorator';
import { DeleteMyInfoUseCase } from '../application/delete-my-info/delete-my-info.use-case';
import { UserDocs } from './user.docs';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(
    private readonly getMyInfoUseCase: GetMyInfoUseCase,
    private readonly deleteMyInfoUseCase: DeleteMyInfoUseCase,
  ) {}

  @Get('me')
  @UseGuards(AuthGuard('jwt-access'))
  @UserDocs('getMyInfo')
  async getMyInfo(@User() user: UserPayload) {
    const { email } = await this.getMyInfoUseCase.execute({ userId: user.userId });

    return { email };
  }

  @Delete('me')
  @UseGuards(AuthGuard('jwt-access'))
  @UserDocs('deleteMyInfo')
  async deleteMyInfo(@User() user: UserPayload) {
    await this.deleteMyInfoUseCase.execute({ userId: user.userId });
  }
}
