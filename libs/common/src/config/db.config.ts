import { registerAs } from '@nestjs/config';
import { env } from './environment';
import { entities } from './../models';
import { DataSource, DataSourceOptions } from 'typeorm';
import { join } from 'path';

export const options: DataSourceOptions = {
  type: 'postgres',
  name: 'default',
  migrationsTableName: 'migrations',

  logging: true,
  synchronize: false,

  host: env.DB_HOST || 'db',
  port: parseInt(env.DB_PORT) || 5432,
  username: env.DB_USER || 'ai',
  password: env.DB_PASSWORD || 'ai',
  database: env.DB_DATABASE || 'ai',

  entities,
  migrations: [join(__dirname, '../migrations/*.{ts,js}')],
};

export const optionsTest: DataSourceOptions = {
  ...options,
  database: env.DB_DATABASE_TEST || 'my_test',
};

export const dataSource = new DataSource(options);
export const dataSourceTest = new DataSource(optionsTest);

export default registerAs('db', () => options);
