import { query } from "express";
import { MigrationInterface, QueryRunner } from "typeorm";

export class DataStoreCharSet1609706815936 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER DATABASE naze CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {}
}
