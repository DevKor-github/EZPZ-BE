import { MySqlDriver, UnderscoreNamingStrategy, defineConfig } from '@mikro-orm/mysql';

export default defineConfig({
  entities: ['dist/**/**/*.entity.js'],
  entitiesTs: ['src/**/**/*.entity.ts'],
  dbName: 'univent_db',
  driver: MySqlDriver,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  namingStrategy: UnderscoreNamingStrategy,
  debug: true,
});
