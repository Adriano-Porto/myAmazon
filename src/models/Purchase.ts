import { Entity, PrimaryColumn, Column, CreateDateColumn } from "typeorm"
import { v4 as uuid } from "uuid"

@Entity("transactions")
class Purchase {
    @PrimaryColumn()
    readonly transaction_id: string

    @Column()
    readonly user_id: string;

    @Column()
    readonly product_id: string;

    @Column()
    readonly value: number;

    @CreateDateColumn()
    created_at: Date

    constructor(){
        if(!this.transaction_id){
            this.transaction_id = uuid()
        }
    }
}

export { Purchase }