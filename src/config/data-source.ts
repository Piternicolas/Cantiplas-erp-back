import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '1234',
  database: 'zero_DB',
  synchronize: false,
  logging: true,
  entities: [__dirname + '/../entity/*.ts'],
  migrations: ['src/migrations/**/*.ts'],
});