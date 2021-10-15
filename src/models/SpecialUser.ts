import { Entity, PrimaryColumn, Column, CreateDateColumn, OneToOne, JoinColumn } from "typeorm"
import { v4 as uuid } from "uuid"

@Entity ("specialUsers")
class SpecialUser {
    @PrimaryColumn()
    readonly id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @OneToOne(type => SpecialUser)
    @JoinColumn({name: "created_by"})
    specialUser: SpecialUser

    @Column()
    created_by: string;

    @CreateDateColumn()
    created_at: Date;

    constructor(){
        if(!this.id){
            this.id = uuid()
        }
    }
}
export { SpecialUser }