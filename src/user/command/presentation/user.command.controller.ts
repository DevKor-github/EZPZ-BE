import { Controller, Delete, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { User, UserPayload } from 'src/shared/core/presentation/user.decorator';
import { DeleteMyInfoUseCase } from '../application/delete/delete.use-case';
import { UserCommandDocs } from './user.command.docs';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly deleteMyInfoUseCase: DeleteMyInfoUseCase) {}
  @Delete('me')
  @UseGuards(AuthGuard('jwt-access'))
  @UserCommandDocs('deleteMyInfo')
  async deleteMyInfo(@User() user: UserPayload) {
    await this.deleteMyInfoUseCase.execute({ userId: user.userId });
  }
}
