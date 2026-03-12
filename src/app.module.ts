import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { AppController } from 'src/app.controller';
import { AppService } from 'src/app.service';
import { ArticleModule } from 'src/article/article.module';
import { SharedModule } from 'src/shared/shared.module';
import { TagModule } from './tag/tag.module';
import { MediaModule } from './media/media.module';
import { ScrapModule } from './scrap/scrap.module';
import mikroOrmConfig from './shared/config/mikro-orm.config';
import config from 'src/shared/config/configuration';
import { AnalyticsModule } from './analytics/analytics.module';
import { IamModule } from 'src/iam/iam.module';

@Module({
  imports: [
    MikroOrmModule.forRoot(mikroOrmConfig),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    IamModule,
    AnalyticsModule,
    ArticleModule,
    SharedModule,
    TagModule,
    MediaModule,
    ScrapModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
