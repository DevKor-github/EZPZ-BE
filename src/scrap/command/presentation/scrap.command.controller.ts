import { Controller, Delete, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { User, UserPayload } from 'src/shared/core/presentation/user.decorator';
import { AddScrapHandler } from '../application/add-scrap/add-scrap.handler';
import { DeleteScrapUseCase } from '../application/delete-scrap/delete-scrap.use-case';
import { ScrapCommandDocs } from './scrap.command.docs';

@ApiTags('scrap')
@Controller('scrap')
export class ScrapCommandController {
  constructor(
    private readonly addScrapHandler: AddScrapHandler,
    private readonly deleteScrapUseCase: DeleteScrapUseCase,
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
    await this.deleteScrapUseCase.execute({ articleId, userId: user.userId });
  }
}
