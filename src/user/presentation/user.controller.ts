import { Controller, Delete, Get, Patch } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor() {}

  @Get('me')
  async getMyInfo() {}

  @Delete('me')
  async deleteMyInfo() {}

  @Get('scrap')
  async getMyScrap() {}

  @Patch('scrap')
  async updateScrap() {}
}
