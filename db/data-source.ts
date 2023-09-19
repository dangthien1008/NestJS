import { DataSource, DataSourceOptions } from 'typeorm';

console.log(process.env.NODE_ENV);

const dbConfig = {
  database: 'db.sqlite',
  migrationsRun: false,
};

switch (process.env.NODE_ENV) {
  case 'test':
    dbConfig.database = 'test.sqlite';
    dbConfig.migrationsRun = true;
    break;
  case 'production':
    break;
  default:
}

export const dataSourceOptions: DataSourceOptions = {
  type: 'sqlite',
  database: dbConfig.database,
  entities: ['dist/**/*.entity{.js, .ts}'],
  migrations: ['dist/db/migrations/*{.js, .ts}'],
  migrationsRun: dbConfig.migrationsRun,
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
