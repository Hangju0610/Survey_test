import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSourceOptions } from 'typeorm';

export const dataSourceOption: DataSourceOptions & TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER || 'postgres',
  database: process.env.DB_DATABASE || 'Survey',
  password: process.env.DB_PASSWORD || 'postgres',
  entities: [],
  synchronize: true,
  autoLoadEntities: true,
  logging: true,
};
