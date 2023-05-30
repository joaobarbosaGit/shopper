import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Products } from "./products.entity";

@Entity("packs")
class Packs {

    @Column("bigint", {
        name: "id",
        nullable: false,
        primary:true,
        generated: "increment"
    })
    id: number;

    @Column("bigint", {
        nullable: false,
        name: "pack_id"
    })
    packId: number;

    @Column("bigint", {
        nullable: false,
        name: "product_id"
    })
    productId: number;

    @Column("bigint", {
        nullable: false,
        name: "qty"
    })
    qty: number;

    // @OneToOne(() => Products)
    // @JoinColumn()
    // products: Products

}

export { Packs }