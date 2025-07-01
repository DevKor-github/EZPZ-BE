import { Module } from '@nestjs/common';
import { MediaModule } from 'src/media/media.module';
import { ArticleCommandModule } from './command/article.command.module';
import { ArticleQueryModule } from './query/article.query.module';

@Module({
  imports: [MediaModule, ArticleCommandModule, ArticleQueryModule],
})
export class ArticleModule {}
