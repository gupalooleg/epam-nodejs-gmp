import { Options } from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { SeedManager } from '@mikro-orm/seeder';
import { DB_USERNAME, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } from './config';

const options: Options<PostgreSqlDriver> = {
  //   debug: true,
  entities: ['./dist/src/entities'],
  entitiesTs: ['./src/entities'],
  migrations: {
    path: './dist/src/migrations',
    pathTs: './src/migrations',
  },
  seeder: {
    path: './dist/src/seeders',
    pathTs: './src/seeders',
  },
  extensions: [SeedManager],
  driver: PostgreSqlDriver,
  dbName: DB_NAME,
  host: DB_HOST,
  port: Number(DB_PORT),
  user: DB_USERNAME,
  password: DB_PASSWORD,
};

export default options;
