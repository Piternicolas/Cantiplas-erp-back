import { MigrationInterface, QueryRunner } from "typeorm";

export class AllTables1748896677128 implements MigrationInterface {
    name = 'AllTables1748896677128'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."cliente_estado_enum" AS ENUM('AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO')`);
        await queryRunner.query(`CREATE TABLE "cliente" ("cliente_id" SERIAL NOT NULL, "nome" character varying NOT NULL, "razaosocial" character varying NOT NULL, "email" character varying NOT NULL, "telefone" character varying NOT NULL, "endereco" character varying NOT NULL, "cidade" character varying NOT NULL, "estado" "public"."cliente_estado_enum" NOT NULL DEFAULT 'PR', "cep" character varying, CONSTRAINT "UQ_503f81286c5e49acd6a832abf43" UNIQUE ("email"), CONSTRAINT "PK_dd0db577ce7b5491f226633b4fa" PRIMARY KEY ("cliente_id"))`);
        await queryRunner.query(`CREATE TYPE "public"."ordem_servico_situacao_enum" AS ENUM('pendente', 'extrusao', 'impressao', 'corte')`);
        await queryRunner.query(`CREATE TYPE "public"."ordem_servico_colorido_enum" AS ENUM('sim', 'nao')`);
        await queryRunner.query(`CREATE TYPE "public"."ordem_servico_estampado_enum" AS ENUM('sim', 'nao')`);
        await queryRunner.query(`CREATE TABLE "ordem_servico" ("OS_id" SERIAL NOT NULL, "data_pedido" date NOT NULL, "criado_por" character varying NOT NULL, "representante" character varying NOT NULL, "situacao" "public"."ordem_servico_situacao_enum" NOT NULL DEFAULT 'pendente', "qnt_pedido" integer NOT NULL, "colorido" "public"."ordem_servico_colorido_enum" NOT NULL DEFAULT 'nao', "estampado" "public"."ordem_servico_estampado_enum" NOT NULL, "cliente_id" integer, CONSTRAINT "PK_65e533a59485ed5bef5199b2645" PRIMARY KEY ("OS_id"))`);
        await queryRunner.query(`ALTER TABLE "ordem_servico" ADD CONSTRAINT "FK_1e6fc9a2df0fe9c992559beb41f" FOREIGN KEY ("cliente_id") REFERENCES "cliente"("cliente_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ordem_servico" DROP CONSTRAINT "FK_1e6fc9a2df0fe9c992559beb41f"`);
        await queryRunner.query(`DROP TABLE "ordem_servico"`);
        await queryRunner.query(`DROP TYPE "public"."ordem_servico_estampado_enum"`);
        await queryRunner.query(`DROP TYPE "public"."ordem_servico_colorido_enum"`);
        await queryRunner.query(`DROP TYPE "public"."ordem_servico_situacao_enum"`);
        await queryRunner.query(`DROP TABLE "cliente"`);
        await queryRunner.query(`DROP TYPE "public"."cliente_estado_enum"`);
    }

}
