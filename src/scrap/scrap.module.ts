import { Module } from '@nestjs/common';
import { ScrapCommandModule } from './command/scrap.command.module';
import { ScrapQueryModule } from './query/scrap.query.module';

@Module({
  imports: [ScrapCommandModule, ScrapQueryModule],
})
export class ScrapModule {}
