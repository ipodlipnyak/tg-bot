import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1714648968036 implements MigrationInterface {
    name = 'Migration1714648968036'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "message" ("id" SERIAL NOT NULL, "content" text, "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_ba01f0a3e0123651915008bc578" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "message"`);
    }

}
