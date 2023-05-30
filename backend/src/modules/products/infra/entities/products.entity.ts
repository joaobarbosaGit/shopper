import { Column, Entity } from "typeorm";

@Entity("products")
class Products {

    @Column('bigint', {
        name: "code",
        nullable: false,
        primary: true
    })
    code: number;

    @Column("varchar", {
        length: 100,
        name: "name",
        nullable: false
    })
    name: string;

    @Column("decimal", {
        precision: 9,
        scale: 2,
        name: "cost_price"
    })
    costPrice: number;

    @Column("decimal", {
        precision: 9,
        scale: 2,
        name: "sales_price"
    })
    salesPrice: number;

}


export { Products }