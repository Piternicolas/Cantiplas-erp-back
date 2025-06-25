import { MigrationInterface, QueryRunner } from "typeorm";

export class AllTables1750820277647 implements MigrationInterface {
    name = 'AllTables1750820277647'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."tb_clientes_tipo_pessoa_enum" AS ENUM('PF', 'PJ')`);
        await queryRunner.query(`CREATE TYPE "public"."tb_clientes_estado_enum" AS ENUM('AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO')`);
        await queryRunner.query(`CREATE TABLE "tb_clientes" ("cliente_id" SERIAL NOT NULL, "nome" character varying(255) NOT NULL, "razaosocial" character varying(255) NOT NULL, "tipo_pessoa" "public"."tb_clientes_tipo_pessoa_enum" NOT NULL, "cnpj" character varying(14) NOT NULL, "cpf" character varying(11), "inscricao_estadual" character varying(20), "inscricao_municipal" character varying(20), "telefone" character varying(15), "celular" character varying(15) NOT NULL, "email" character varying(100) NOT NULL, "site" character varying(255), "cep" character varying(20) NOT NULL, "endereco" character varying(255) NOT NULL, "cidade" character varying(100) NOT NULL, "estado" "public"."tb_clientes_estado_enum" NOT NULL DEFAULT 'PR', "data_cadastro" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_47ef2b2728a04cabc778dbba5db" PRIMARY KEY ("cliente_id"))`);
        await queryRunner.query(`CREATE TYPE "public"."tb_extrusao_tratamento_enum" AS ENUM('sim', 'simples', 'duplo')`);
        await queryRunner.query(`CREATE TABLE "tb_extrusao" ("extrusao_id" integer NOT NULL, "descricao_ext" character varying(255), "kg_extrusado" numeric(5,1) NOT NULL DEFAULT '0', "apara_ext" numeric(5,1) DEFAULT '0', "calibrador" numeric(2) NOT NULL DEFAULT '0', "pigmento" character varying(50) DEFAULT 'nao', "metragem" numeric(10,2) NOT NULL DEFAULT '0', "tratamento" "public"."tb_extrusao_tratamento_enum" NOT NULL, "aba" numeric(4,2) NOT NULL DEFAULT '0', "data_fim_ext" TIMESTAMP, "pedido_id" integer, CONSTRAINT "REL_efc63cc6f9d42ea64677299306" UNIQUE ("pedido_id"), CONSTRAINT "PK_495452c1bc50e1c62bb35b78598" PRIMARY KEY ("extrusao_id"))`);
        await queryRunner.query(`CREATE TYPE "public"."tb_impressao_cyrel_enum" AS ENUM('novo', 'velho')`);
        await queryRunner.query(`CREATE TABLE "tb_impressao" ("impressao_id" SERIAL NOT NULL, "descricao_imp" character varying(255), "kg_impresso" numeric(5,1) NOT NULL DEFAULT '0', "apara_imp" numeric(5,1) NOT NULL DEFAULT '0', "metragem" numeric(10,2) NOT NULL DEFAULT '0', "cilindro" numeric(2) NOT NULL DEFAULT '0', "pasta_cliche" numeric(4) NOT NULL DEFAULT '0', "cyrel" "public"."tb_impressao_cyrel_enum" NOT NULL, "data_fim_imp" TIMESTAMP, "pedido_id" integer, CONSTRAINT "REL_6657396fb7d248bac4a602b14c" UNIQUE ("pedido_id"), CONSTRAINT "PK_8532c4a957b357fbdc8168f11c9" PRIMARY KEY ("impressao_id"))`);
        await queryRunner.query(`CREATE TABLE "tb_corte" ("corte_id" SERIAL NOT NULL, "descricao_corte" character varying(255), "kg_cortado" numeric(5,1) NOT NULL DEFAULT '0', "apara_corte" numeric(5,1) NOT NULL DEFAULT '0', "milheiro_final" numeric(6,2) NOT NULL DEFAULT '0', "volumes" numeric(3) NOT NULL DEFAULT '0', "pedido_id" integer, CONSTRAINT "REL_59922a1b53bbef5f9288ac0b45" UNIQUE ("pedido_id"), CONSTRAINT "PK_c87ed0a9f18b705c5f6d8e80e55" PRIMARY KEY ("corte_id"))`);
        await queryRunner.query(`CREATE TYPE "public"."tb_ordemservico_pedido_material_enum" AS ENUM('canela', 'coex', 'colorido', 'cristal', 'pead', 'pebd', 'pp')`);
        await queryRunner.query(`CREATE TYPE "public"."tb_ordemservico_pedido_estampado_enum" AS ENUM('sim', 'nao')`);
        await queryRunner.query(`CREATE TYPE "public"."tb_ordemservico_pedido_colorido_enum" AS ENUM('sim', 'nao')`);
        await queryRunner.query(`CREATE TYPE "public"."tb_ordemservico_pedido_tipo_corte_enum" AS ENUM('lateral', 'fundo', 'sacola')`);
        await queryRunner.query(`CREATE TABLE "tb_ordemservico_pedido" ("pedido_id" SERIAL NOT NULL, "numero_os" character varying(20) NOT NULL, "data_abertura" TIMESTAMP NOT NULL DEFAULT now(), "data_entrega" TIMESTAMP, "material" "public"."tb_ordemservico_pedido_material_enum" NOT NULL, "milheiro" numeric(10,2) NOT NULL, "valor_milheiro" numeric(10,2) NOT NULL, "kg_pedido" numeric(10,2) NOT NULL, "largura" numeric(10,2) NOT NULL, "altura" numeric(10,2) NOT NULL, "micra" numeric(10,4) NOT NULL, "estampado" "public"."tb_ordemservico_pedido_estampado_enum" NOT NULL DEFAULT 'nao', "colorido" "public"."tb_ordemservico_pedido_colorido_enum" NOT NULL DEFAULT 'nao', "pigmento" character varying(50) DEFAULT 'N/A', "descricao_pedido" character varying(255) DEFAULT 'N/A', "data_fechamento" TIMESTAMP, "sanfona_corte" character varying(10) NOT NULL, "tipo_corte" "public"."tb_ordemservico_pedido_tipo_corte_enum" NOT NULL DEFAULT 'lateral', "Embalar_com" numeric(5,1) NOT NULL DEFAULT '0', "tipo_furo" character varying(50) DEFAULT 'N/A', "tipo_alca" character varying(50) DEFAULT 'N/A', "tipo_fita" character varying(50) DEFAULT 'N/A', "cliente_id" integer, "representante_id" integer, CONSTRAINT "UQ_a7b4770f0a00b2077ee54141e10" UNIQUE ("numero_os"), CONSTRAINT "PK_f6c9e95905a55a2239959b8b7d7" PRIMARY KEY ("pedido_id"))`);
        await queryRunner.query(`CREATE TYPE "public"."tb_representantes_tipo_pessoa_enum" AS ENUM('PF', 'PJ')`);
        await queryRunner.query(`CREATE TYPE "public"."tb_representantes_estado_enum" AS ENUM('AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO')`);
        await queryRunner.query(`CREATE TABLE "tb_representantes" ("representante_id" SERIAL NOT NULL, "nome" character varying(255) NOT NULL, "razaosocial" character varying(255) NOT NULL, "tipo_pessoa" "public"."tb_representantes_tipo_pessoa_enum" NOT NULL, "cnpj" character varying(14) NOT NULL, "cpf" character varying(11), "inscricao_estadual" character varying(20), "inscricao_municipal" character varying(20), "telefone" character varying(15), "celular" character varying(15) NOT NULL, "email" character varying(100) NOT NULL, "site" character varying(255), "cep" character varying(20) NOT NULL, "endereco" character varying(255) NOT NULL, "cidade" character varying(100) NOT NULL, "estado" "public"."tb_representantes_estado_enum" NOT NULL DEFAULT 'PR', "data_cadastro" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_2ebf76a57d675b389e8a864af31" PRIMARY KEY ("representante_id"))`);
        await queryRunner.query(`ALTER TABLE "tb_extrusao" ADD CONSTRAINT "FK_efc63cc6f9d42ea64677299306d" FOREIGN KEY ("pedido_id") REFERENCES "tb_ordemservico_pedido"("pedido_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tb_impressao" ADD CONSTRAINT "FK_6657396fb7d248bac4a602b14c2" FOREIGN KEY ("pedido_id") REFERENCES "tb_ordemservico_pedido"("pedido_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tb_corte" ADD CONSTRAINT "FK_59922a1b53bbef5f9288ac0b454" FOREIGN KEY ("pedido_id") REFERENCES "tb_ordemservico_pedido"("pedido_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tb_ordemservico_pedido" ADD CONSTRAINT "FK_cc2549319f12b88caeb4b1b0f8e" FOREIGN KEY ("cliente_id") REFERENCES "tb_clientes"("cliente_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tb_ordemservico_pedido" ADD CONSTRAINT "FK_37db886a7dc430035922694bc4a" FOREIGN KEY ("representante_id") REFERENCES "tb_representantes"("representante_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tb_ordemservico_pedido" DROP CONSTRAINT "FK_37db886a7dc430035922694bc4a"`);
        await queryRunner.query(`ALTER TABLE "tb_ordemservico_pedido" DROP CONSTRAINT "FK_cc2549319f12b88caeb4b1b0f8e"`);
        await queryRunner.query(`ALTER TABLE "tb_corte" DROP CONSTRAINT "FK_59922a1b53bbef5f9288ac0b454"`);
        await queryRunner.query(`ALTER TABLE "tb_impressao" DROP CONSTRAINT "FK_6657396fb7d248bac4a602b14c2"`);
        await queryRunner.query(`ALTER TABLE "tb_extrusao" DROP CONSTRAINT "FK_efc63cc6f9d42ea64677299306d"`);
        await queryRunner.query(`DROP TABLE "tb_representantes"`);
        await queryRunner.query(`DROP TYPE "public"."tb_representantes_estado_enum"`);
        await queryRunner.query(`DROP TYPE "public"."tb_representantes_tipo_pessoa_enum"`);
        await queryRunner.query(`DROP TABLE "tb_ordemservico_pedido"`);
        await queryRunner.query(`DROP TYPE "public"."tb_ordemservico_pedido_tipo_corte_enum"`);
        await queryRunner.query(`DROP TYPE "public"."tb_ordemservico_pedido_colorido_enum"`);
        await queryRunner.query(`DROP TYPE "public"."tb_ordemservico_pedido_estampado_enum"`);
        await queryRunner.query(`DROP TYPE "public"."tb_ordemservico_pedido_material_enum"`);
        await queryRunner.query(`DROP TABLE "tb_corte"`);
        await queryRunner.query(`DROP TABLE "tb_impressao"`);
        await queryRunner.query(`DROP TYPE "public"."tb_impressao_cyrel_enum"`);
        await queryRunner.query(`DROP TABLE "tb_extrusao"`);
        await queryRunner.query(`DROP TYPE "public"."tb_extrusao_tratamento_enum"`);
        await queryRunner.query(`DROP TABLE "tb_clientes"`);
        await queryRunner.query(`DROP TYPE "public"."tb_clientes_estado_enum"`);
        await queryRunner.query(`DROP TYPE "public"."tb_clientes_tipo_pessoa_enum"`);
    }

}
