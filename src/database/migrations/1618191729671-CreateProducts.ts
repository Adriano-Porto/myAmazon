import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateProducts1618191729671 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name:"products",
                columns:[
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "name",
                        type: "varchar",
                    },
                    {
                        name: "description",
                        type: "varchar"
                    },
                    {
                        name: "price",
                        type: "double"
                    },
                    {
                        name: "quantity",
                        type: "integer"
                    },
                    {
                        name: "manufacturer",
                        type: "string"
                    },
                    {
                        name: "main_photo",
                        type: "string"
                    },
                    {
                        name: "product_photos",
                        type: "string"
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
                    },
                    {
                        name: "created_by",
                        type: "uuid"
                    }
                ],
                foreignKeys: [
                    {
                        name: "FKCreated_by",
                        referencedTableName: "specialusers",
                        referencedColumnNames: ["id"],
                        columnNames: ["created_by"],
                        onDelete: "SET NULL",
                        onUpdate: "SET NULL",
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("products")
    }

}
