import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateSpecialUsers1618336002506 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.createTable(
            new Table({
                name: "specialUsers",
                columns:[
                    {
                        name: "id",
                        type: "uuid"
                    },
                    {
                        name: "name",
                        type: "string"
                    },
                    {
                        name: "email",
                        type: "string"
                    },
                    {
                        name: "password",
                        type: "string"
                    },
                    {
                        name: "created_by",
                        type: "uuid"
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
                    },
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.dropTable("specialUsers")
    }

}
