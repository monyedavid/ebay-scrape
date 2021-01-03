import {MigrationInterface, QueryRunner} from "typeorm";

export class DataStoreTimeStamp1609703355637 implements MigrationInterface {
    name = 'DataStoreTimeStamp1609703355637'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `naze` ADD `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `naze` DROP COLUMN `timestamp`");
    }

}
