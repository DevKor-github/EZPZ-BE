import { Controller, Delete, Get, Patch, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetMyInfoUseCase } from '../application/get-my-info/get-my-info.use-case';
import { AuthGuard } from '@nestjs/passport';
import { User, UserPayload } from 'src/shared/presentation/decorator/user.decorator';
import { DeleteMyInfoUseCase } from '../application/delete-my-info/delete-my-info.use-case';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(
    private readonly getMyInfoUseCase: GetMyInfoUseCase,
    private readonly deleteMyInfoUseCase: DeleteMyInfoUseCase,
  ) {}

  @UseGuards(AuthGuard('jwt-access'))
  @Get('me')
  async getMyInfo(@User() user: UserPayload) {
    const { email } = await this.getMyInfoUseCase.execute({ userId: user.userId });

    return { email };
  }

  @UseGuards(AuthGuard('jwt-access'))
  @Delete('me')
  async deleteMyInfo(@User() user: UserPayload) {
    await this.deleteMyInfoUseCase.execute({ userId: user.userId });
  }

  @Get('scrap')
  async getMyScrap() {}

  @Patch('scrap')
  async updateScrap() {}
}
