import { query } from "express";
import { MigrationInterface, QueryRunner } from "typeorm";

export class DataStoreCharSet1609706815936 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER DATABASE
            naze
            CHARACTER SET = utf8
            COLLATE = utf8_unicode_ci
        `);

        await queryRunner.query(
            "ALTER TABLE naze.naze MODIFY COLUMN sub_title VARCHAR(255) CHARACTER SET utf8 COLLATE utf8_general_ci;"
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {}
}
