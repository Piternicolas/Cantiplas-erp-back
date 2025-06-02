import { DataSource } from "typeorm";
import { OrdemServico } from "../entity/OrdemServico";
import { Cliente } from "../entity/Cliente";

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '1234',
  database: 'zero_DB',
  synchronize: false,
  logging: true,
  entities: [OrdemServico, Cliente],
  migrations: ['src/migrations/**/*.ts'],
});