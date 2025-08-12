import { Controller, Delete, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { User, UserPayload } from 'src/shared/core/presentation/user.decorator';
import { AddScrapHandler } from '../application/add-scrap/add-scrap.handler';
import { ScrapCommandDocs } from './scrap.command.docs';
import { DeleteScrapHandler } from '../application/delete-scrap/delete-scrap.handler';

@ApiTags('scrap')
@Controller('scrap')
export class ScrapCommandController {
  constructor(
    private readonly addScrapHandler: AddScrapHandler,
    private readonly deleteScrapHandler: DeleteScrapHandler,
  ) {}

  @Post(':id')
  @UseGuards(AuthGuard('jwt-access'))
  @ScrapCommandDocs('addScrap')
  async addScrap(@Param('id') articleId: string, @User() user: UserPayload) {
    await this.addScrapHandler.execute({ articleId, userId: user.userId });
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt-access'))
  @ScrapCommandDocs('deleteScrap')
  async deleteScrap(@Param('id') articleId: string, @User() user: UserPayload) {
    await this.deleteScrapHandler.execute({ articleId, userId: user.userId });
  }
}
