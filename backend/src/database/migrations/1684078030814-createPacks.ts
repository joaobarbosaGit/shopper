import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreatePacks1684078030814 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "packs",
                columns: [
                    {
                        name: "id",
                        type: "bigint",
                        isPrimary: true,
                        isGenerated:true,
                        generationStrategy: "increment"
                    },
                    {
                        name: "pack_id",
                        type: "bigint",
                        isNullable: false
                    },
                    {
                        name: "product_id",
                        type: "bigint",
                        isNullable: false,
                    },
                    {
                        name: "qty",
                        type: "bigint",
                        isNullable: false,
                    }
                ],
                foreignKeys: [
                    {
                        name: "FKpacks_id",
                        referencedTableName: "products",
                        referencedColumnNames: ["code"],
                        columnNames: ["pack_id"],
                        onDelete: "CASCADE",
                        onUpdate: "CASCADE",
                    },
                    {
                        name: "FKproduct_id",
                        referencedTableName: "products",
                        referencedColumnNames: ["code"],
                        columnNames: ["product_id"],
                        onDelete: "CASCADE",
                        onUpdate: "CASCADE",
                    }
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("packs");
    }

}
