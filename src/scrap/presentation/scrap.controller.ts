import { Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { GetMyScrapUseCase } from '../application/get-my-scrap/get-my-scrap.use-case';
import { User, UserPayload } from 'src/shared/presentation/decorator/user.decorator';

@ApiTags('scrap')
@Controller('scrap')
export class ScrapController {
  constructor(private readonly getMyScrapUseCase: GetMyScrapUseCase) {}

  @Get()
  @UseGuards(AuthGuard('jwt-access'))
  async getMyScrap(@User() user: UserPayload) {
    return await this.getMyScrapUseCase.execute({ userId: user.userId });
  }

  @Patch()
  async updateScrap() {}
}
