import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { User, UserPayload } from 'src/shared/core/presentation/user.decorator';
import { GetMyScrapUseCase } from '../application/get-my-scrap/get-my-scrap.use-case';
import { CheckScrapUseCase } from '../application/check-scrap/check-scrap.use-case';
import { GetScrapSearchUseCase } from '../application/scrap-search/get-scrap-search.use-case';
import { ScrapQueryDocs } from './scrap.query.docs';
import { GetMyScrapRequestDto } from './dto/get-my-scrap.request.dto';
import { GetScrapSearchRequestDto } from '../application/scrap-search/dto/get-scrap-search.request.dto';

@ApiTags('scrap')
@Controller('scrap')
export class ScrapQueryController {
  constructor(
    private readonly getMyScrapUseCase: GetMyScrapUseCase,
    private readonly checkScrapUseCase: CheckScrapUseCase,
    private readonly getScrapSearchUseCase: GetScrapSearchUseCase,
  ) {}

  @Get('searchScrap')
  @UseGuards(AuthGuard('jwt-access'))
  @ScrapQueryDocs('searchScrap')
  async getScrapSearch(@User() user: UserPayload, @Query() reqDto: GetScrapSearchRequestDto) {
    return await this.getScrapSearchUseCase.execute(user.userId, reqDto);
  }

  @Get()
  @UseGuards(AuthGuard('jwt-access'))
  @ScrapQueryDocs('getMyScrap')
  async getMyScrap(@User() user: UserPayload, @Query() reqDto: GetMyScrapRequestDto) {
    const userId = user.userId;
    const { tags, isFinished, sortBy, page, limit } = reqDto;

    return await this.getMyScrapUseCase.execute({ userId, tags, isFinished, sortBy, page, limit });
  }

  @Get('article/:id')
  @UseGuards(AuthGuard('jwt-access'))
  @ScrapQueryDocs('checkScrap')
  async checkScrap(@Param('id') articleId: string, @User() user: UserPayload) {
    return await this.checkScrapUseCase.execute({ articleId, userId: user.userId });
  }
}
