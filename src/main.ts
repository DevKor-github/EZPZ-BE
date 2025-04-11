import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MikroORM } from '@mikro-orm/mysql';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // DB schema generation
  // CI/CD 구축 시 명령어로 대체 혹은 다른 방법 사용 예정
  await app.get(MikroORM).getSchemaGenerator().ensureDatabase();
  await app.get(MikroORM).getSchemaGenerator().updateSchema();

  await app.listen(process.env.SERVER_PORT ?? 3000);
}
bootstrap();
