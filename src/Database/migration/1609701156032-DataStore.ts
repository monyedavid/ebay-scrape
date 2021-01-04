import { MigrationInterface, QueryRunner } from "typeorm";

export class DataStore1609701156032 implements MigrationInterface {
    name = "DataStore1609701156032";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            "CREATE TABLE `naze` (`id` int NOT NULL AUTO_INCREMENT, `date_sold` varchar(255) NOT NULL, `item_hash` varchar(255) NOT NULL, `product_link` varchar(255) NOT NULL, `product_price` varchar(255) NOT NULL, `product_bids` varchar(255) NOT NULL, `rating` varchar(255) NOT NULL, `rating_link` varchar(255) NOT NULL, `rating_review_count` varchar(255) NOT NULL, `sub_title` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE utf8mb4_unicode_ci"
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP TABLE `naze`");
    }
}
