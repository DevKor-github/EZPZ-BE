import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { AppController } from 'src/app.controller';
import { AppService } from 'src/app.service';
import { AuthModule } from 'src/auth/auth.module';
import { ArticleModule } from 'src/article/article.module';
import { UserModule } from 'src/user/user.module';
import { SharedModule } from 'src/shared/shared.module';
import { TagModule } from './tag/tag.module';
import { MediaModule } from './media/media.module';
import { ScrapModule } from './scrap/scrap.module';
import mikroOrmConfig from './shared/config/mikro-orm.config';
import config from 'src/shared/config/configuration';

@Module({
  imports: [
    MikroOrmModule.forRoot(mikroOrmConfig),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    AuthModule,
    ArticleModule,
    UserModule,
    SharedModule,
    TagModule,
    MediaModule,
    ScrapModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
