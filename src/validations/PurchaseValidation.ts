import { getCustomRepository, Repository } from "typeorm"
import { ValidationError } from "../errors/ValidationError";
import { Product } from "../models/Product";
import { User } from "../models/User";
import { ProductRepository } from "../repositories/ProductRepository";
import { UserRepository } from "../repositories/UserRepository";

class PurchaseValidation {
    private userRepository: Repository<User>;
    private productRepository: Repository<Product>;

    constructor() {
        this.userRepository = getCustomRepository(UserRepository)
        this.productRepository = getCustomRepository(ProductRepository)
    }

    async userValidation (userId:string ) {
        const userFound = await this.userRepository.findOne({
            where: {id: userId}
        })

        if(!userFound) {
            throw new ValidationError("User Does Not Exist", 404)
        }
        return userFound
    }

    async productValidation (product:string) {
        const productFound = await this.productRepository.findOne({
            where: {id: product}
        })

        if(!productFound){
            throw new ValidationError("Product does not Exist", 404)
        }
        if(productFound.quantity === 0){
            throw new ValidationError("Product is not available", 402)
        }

        return productFound
    }
}

export  { PurchaseValidation }