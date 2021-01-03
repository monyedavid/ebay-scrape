import {MigrationInterface, QueryRunner} from "typeorm";

export class DataStoreConsole1609703156573 implements MigrationInterface {
    name = 'DataStoreConsole1609703156573'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `naze` ADD `console_type` varchar(255) NOT NULL COMMENT 'xbox|ps5'");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `naze` DROP COLUMN `console_type`");
    }

}
