import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MikroORM } from '@mikro-orm/mysql';
import { SwaggerModule } from '@nestjs/swagger';
import { swaggerConfig } from './shared/config/swagger.config';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS 설정
  app.enableCors({
    origin: ['http://localhost:3000', 'https://localhost:5173', 'http://localhost:5173', 'https://goyangeyaong.shop'],
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  });

  // DB schema generation
  // CI/CD 구축 시 명령어로 대체 혹은 다른 방법 사용 예정
  await app.get(MikroORM).getSchemaGenerator().ensureDatabase();
  await app.get(MikroORM).getSchemaGenerator().updateSchema();

  // ValidationPipe 설정
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  // Swagger 설정
  const document = SwaggerModule.createDocument(app, swaggerConfig());
  SwaggerModule.setup('/api', app, document);

  // Cookie 설정
  app.use(cookieParser());

  await app.listen(process.env.SERVER_PORT ?? 3000);
}
bootstrap();
