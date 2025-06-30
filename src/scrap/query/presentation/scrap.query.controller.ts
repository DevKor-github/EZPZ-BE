import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { User, UserPayload } from 'src/shared/presentation/decorator/user.decorator';
import { GetMyScrapUseCase } from '../application/get-my-scrap/get-my-scrap.use-case';
import { CheckScrapUseCase } from '../application/check-scrap/check-scrap.use-case';
import { ScrapQueryDocs } from './scrap.query.docs';

@ApiTags('scrap')
@Controller('scrap')
export class ScrapQueryController {
  constructor(
    private readonly getMyScrapUseCase: GetMyScrapUseCase,
    private readonly checkScrapUseCase: CheckScrapUseCase,
  ) {}

  @Get()
  @UseGuards(AuthGuard('jwt-access'))
  @ScrapQueryDocs('getMyScrap')
  async getMyScrap(@User() user: UserPayload) {
    return await this.getMyScrapUseCase.execute({ userId: user.userId });
  }

  @Get('article/:id')
  @UseGuards(AuthGuard('jwt-access'))
  @ScrapQueryDocs('checkScrap')
  async checkScrap(@Param('id') articleId: string, @User() user: UserPayload) {
    return await this.checkScrapUseCase.execute({ articleId, userId: user.userId });
  }
}
