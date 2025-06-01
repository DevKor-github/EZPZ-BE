import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { GetMyScrapUseCase } from '../application/get-my-scrap/get-my-scrap.use-case';
import { User, UserPayload } from 'src/shared/presentation/decorator/user.decorator';
import { ScrapDocs } from './scrap.docs';
import { AddScrapUseCase } from '../application/add-scrap/add-scrap.use-case';

@ApiTags('scrap')
@Controller('scrap')
export class ScrapController {
  constructor(
    private readonly getMyScrapUseCase: GetMyScrapUseCase,
    private readonly addScrapUseCase: AddScrapUseCase,
  ) {}

  @Get()
  @UseGuards(AuthGuard('jwt-access'))
  @ScrapDocs('getMyScrap')
  async getMyScrap(@User() user: UserPayload) {
    return await this.getMyScrapUseCase.execute({ userId: user.userId });
  }

  @Post(':id')
  @UseGuards(AuthGuard('jwt-access'))
  async addScrap(@Param('id') articleId: string, @User() user: UserPayload) {
    await this.addScrapUseCase.execute({ articleId, userId: user.userId });
  }
}
