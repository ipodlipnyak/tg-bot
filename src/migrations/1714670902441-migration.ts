import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1714670902441 implements MigrationInterface {
    name = 'Migration1714670902441'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "message" ADD "chatid" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "message" ALTER COLUMN "content" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "message" ALTER COLUMN "content" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "message" DROP COLUMN "chatid"`);
    }

}
