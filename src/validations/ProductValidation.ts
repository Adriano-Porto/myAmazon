import { getCustomRepository, Repository } from "typeorm"
import { ValidationError } from "../errors/ValidationError"

import { ProductRepository } from "../repositories/ProductRepository"
import { SpecialUserRepository } from "../repositories/SpecialUserRepository"
import { SpecialUser } from "../models/SpecialUser"
import { Product } from "../models/Product"

interface productInterface {
    quantity: any,
    value: number,
    name: string,
    description: string,
    manufacturer: string,
    images: string,
    main_photo: string,
    product_photos: string,
    created_by: string
}

class ProductValidation {

    private productRepository: Repository<Product>
    private specialUserRepository: Repository<SpecialUser>

    constructor () {
        this.productRepository = getCustomRepository(ProductRepository)
        this.specialUserRepository = getCustomRepository(SpecialUserRepository)
    }

    dataValidation ({
        quantity,
        value,
        name,
        description, 
        manufacturer,
        main_photo,
        product_photos,
        created_by
    } : productInterface ) {
        
        validateNumbers(quantity, value)
        validateStrings(name, description, manufacturer, main_photo, created_by)
        validateImages(main_photo, product_photos)

        function validateNumbers(quantity: number, value: number ){
            if(quantity < 0 || value < 0){
                throw new ValidationError(
                    "Can not have negative numbers as quantity or price",
                    406
                )
            }
        }

        function validateStrings(
            name: string,
            description: string,
            manufacturer: string,
            main_photo: string,
            created_by: string
        ) {
            if(!name) {
                throw new ValidationError(
                    "name wasn't mentioned",
                    406
                )
            }

            if(!description) {
                throw new ValidationError(
                    "description wasn't mentioned",
                    406
                )
            }

            if(!name) {
                throw new ValidationError(
                    "name wasn't mentioned",
                    406
                )
            }

            if(!manufacturer) {
                throw new ValidationError(
                    "manufacturer wasn't mentioned",
                    406
                )
            }

            if(!main_photo) {
                throw new ValidationError(
                    "Main Photo wasn't mentioned",
                    406
                )
            }
            
            if(!created_by) {
                throw new ValidationError(
                    "Created By wasn't mentioned",
                    406
                )
            }

            if( 
                
                name.trim().length === 0 ||
                description.trim().length === 0 ||
                manufacturer.trim().length === 0 || 
                main_photo.trim().length === 0 ||
                created_by.trim().length === 0
            ) {
                throw new ValidationError(
                    "Can't have empty strings on the database",
                    406
                )
            }
        }

        function validateImages (main_photo : string, product_photos : string) {
            if(main_photo.trim().length === 0 || !main_photo) {
                throw new ValidationError("main_photo cannot be null", 406)
            }

            const images = JSON.parse(product_photos)
            images.forEach((val : string)=>{
                if(val.length === 0 || val === ""){
                    throw new ValidationError("Can't save empty strings on the database", 406)
                }
            })

        }
        
    }

    async productAlreadyExists ( pdReceived : productInterface ) {
        const productFound = await this.productRepository.findOne({
            where: { name: String(pdReceived.name) } 
        })

        if(productFound){
            throw new ValidationError(
                `Product Already Exists in the Databse, is this the product you're looking for? ${pdReceived.name}, ${pdReceived.description}, price: ${pdReceived.value}`,
                402)
        }
    }

    async specialUserExists (created_by : string) {
        const userExists = await this.specialUserRepository.findOne({
            where: {id: created_by }
        })
        if(!userExists) {
            throw new ValidationError(
                "User that added the product don't exists, was removed or wasn't mentioned",
                404)
        }
    }
}

export { ProductValidation }
