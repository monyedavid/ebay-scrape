import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("naze", {})
export class naze extends BaseEntity {
    @PrimaryGeneratedColumn({ type: "int", name: "id" })
    id: number;

    @Column("varchar", { comment: "xbox|ps5" })
    console_type: string;

    @Column({
        name: "timestamp",
        type: "timestamp",
        nullable: false,
        default: () => "CURRENT_TIMESTAMP",
    })
    timestamp: string;

    @Column("varchar")
    date_sold: string;

    @Column("varchar")
    item_hash: string;

    @Column("varchar")
    product_link: string;

    @Column("varchar")
    product_price: string;

    @Column("varchar")
    product_bids: string;

    @Column("varchar")
    rating: string;

    @Column("varchar")
    rating_link: string;

    @Column("varchar")
    rating_review_count: string;

    @Column("varchar")
    sub_title: string;
}
