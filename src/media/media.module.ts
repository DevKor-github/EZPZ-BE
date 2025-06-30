import { Module } from '@nestjs/common';
import { MediaCommandModule } from './command/media.command.module';
import { MediaQueryModule } from './query/media.query.module';

@Module({
  imports: [MediaCommandModule, MediaQueryModule],
})
export class MediaModule {}
