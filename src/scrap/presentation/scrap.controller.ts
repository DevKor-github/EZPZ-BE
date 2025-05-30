import { Controller, Get, Patch } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('scrap')
@Controller('scrap')
export class ScrapController {
  @Get('scrap')
  async getMyScrap() {}

  @Patch('scrap')
  async updateScrap() {}
}
