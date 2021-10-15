import { Entity, PrimaryColumn, Column, CreateDateColumn, JoinColumn, ManyToOne } from "typeorm"
import { SpecialUser } from "../models/SpecialUser"
import { v4 as uuid } from "uuid"

@Entity("products")
class Product {
    @PrimaryColumn()
    readonly id: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column("double")
    price: number;

    @Column()
    quantity: number;

    @Column()
    manufacturer: string;

    @Column()
    main_photo: string;

    @Column()
    product_photos: string;

    @CreateDateColumn()
    created_at: Date;

    @JoinColumn({name: "created_by"})
    @ManyToOne(()=>SpecialUser)
    specialUser: SpecialUser

    @Column()
    created_by: string;



    constructor(){
        if(!this.id){
            this.id = uuid()
        }
    }
}

export { Product }