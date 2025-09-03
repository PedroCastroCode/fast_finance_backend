import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1749145287101 implements MigrationInterface {
    name = ' $npmConfigName1749145287101'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."users_usertype_enum" AS ENUM('ADMIN', 'USER')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL, "email" character varying(255), "password" character varying(255) NOT NULL, "username" character varying(255) NOT NULL, "userType" "public"."users_usertype_enum" NOT NULL, CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."transactions_type_enum" AS ENUM('despesa', 'receita', 'despesa_parcelada')`);
        await queryRunner.query(`CREATE TABLE "transactions" ("id" uuid NOT NULL, "type" "public"."transactions_type_enum" NOT NULL, "value" numeric(10,2) NOT NULL, "category" character varying(100) NOT NULL, "date" TIMESTAMP NOT NULL, "description" character varying(255), CONSTRAINT "PK_a219afd8dd77ed80f5a862f1db9" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "transactions"`);
        await queryRunner.query(`DROP TYPE "public"."transactions_type_enum"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_usertype_enum"`);
    }

}
