import { getCustomRepository, Repository } from "typeorm"
import { Product } from "../models/Product"
import { Purchase } from "../models/Purchase"
import { User } from "../models/User"
import { ProductRepository } from "../repositories/ProductRepository"
import { PurchaseRepository } from "../repositories/PurchaseRepository"
import { UserRepository } from "../repositories/UserRepository"

interface IPurchaseObject {
    user_id: string,
    product_id: string,
    transaction_id: string,
    value: number,
    created_at: Date
}

class PurchaseService {
    private purchaseRepository: Repository<Purchase>
    private productRepository: Repository<Product>
    private userRepository: Repository<User>

    constructor() {
        this.purchaseRepository = getCustomRepository(PurchaseRepository)
        this.productRepository = getCustomRepository(ProductRepository)
        this.userRepository = getCustomRepository(UserRepository)
    }

    createPurchase (user_id: string, product_id: string, value: number):IPurchaseObject {
        const purchaseObject = {
            user_id,
            product_id,
            value
        }
        const purchase =  this.purchaseRepository.create(purchaseObject)
        return purchase
    }

    async makeTransaction(user:any, product:any) {
        user.money -= product.price
        product.quantity -= 1
        await this.productRepository.update(product.id, {quantity: product.quantity})
        await this.userRepository.update(user.id, { money: user.money })
    }

    async save(purchase:IPurchaseObject) {
        await this.purchaseRepository.save(purchase)
    }
}

export { PurchaseService } 