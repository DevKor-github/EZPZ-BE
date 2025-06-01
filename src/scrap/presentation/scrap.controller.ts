import { Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { GetMyScrapUseCase } from '../application/get-my-scrap/get-my-scrap.use-case';
import { User, UserPayload } from 'src/shared/presentation/decorator/user.decorator';
import { ScrapDocs } from './scrap.docs';
import { AddScrapUseCase } from '../application/add-scrap/add-scrap.use-case';
import { CheckScrapUseCase } from '../application/check-scrap/check-scrap.use-case';
import { DeleteScrapUseCase } from '../application/delete-scrap/delete-scrap.use-case';

@ApiTags('scrap')
@Controller('scrap')
export class ScrapController {
  constructor(
    private readonly getMyScrapUseCase: GetMyScrapUseCase,
    private readonly addScrapUseCase: AddScrapUseCase,
    private readonly checkScrapUseCase: CheckScrapUseCase,
    private readonly deleteScrapUseCase: DeleteScrapUseCase,
  ) {}

  @Get()
  @UseGuards(AuthGuard('jwt-access'))
  @ScrapDocs('getMyScrap')
  async getMyScrap(@User() user: UserPayload) {
    return await this.getMyScrapUseCase.execute({ userId: user.userId });
  }

  @Get('article/:id')
  @UseGuards(AuthGuard('jwt-access'))
  @ScrapDocs('checkScrap')
  async checkScrap(@Param('id') articleId: string, @User() user: UserPayload) {
    return await this.checkScrapUseCase.execute({ articleId, userId: user.userId });
  }

  @Post(':id')
  @UseGuards(AuthGuard('jwt-access'))
  @ScrapDocs('addScrap')
  async addScrap(@Param('id') articleId: string, @User() user: UserPayload) {
    await this.addScrapUseCase.execute({ articleId, userId: user.userId });
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt-access'))
  @ScrapDocs('deleteScrap')
  async deleteScrap(@Param('id') articleId: string, @User() user: UserPayload) {
    await this.deleteScrapUseCase.execute({ articleId, userId: user.userId });
  }
}
