import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateProducts1684069948297 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
              name: "products",
              columns: [
                {
                  name: "code",
                  type: "bigint",
                  isPrimary: true,
                },
                {
                    name:"name",
                    type:"varchar",
                    length:"100",
                    isNullable:false
                },
                {
                    name:"cost_price",
                    type:"decimal",
                    precision:9,
                    scale:2,
                    isNullable:false
                },
                {
                    name:"sales_price",
                    type:"decimal",
                    precision:9,
                    scale:2,
                    isNullable:false
                }
              ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("products");
    }

}
