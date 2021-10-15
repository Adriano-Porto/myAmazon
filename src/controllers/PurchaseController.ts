import { Request, Response } from "express"
import { PurchaseValidation } from "../validations/PurchaseValidation"
import { ValidationError } from "../errors/ValidationError"
import { PurchaseService } from "../services/PurchaseService"

class PurchaseController {
    async create (request: Request, response: Response) {
        const { user, product } = request.body

        const purchaseValidations = new PurchaseValidation()
        const purchaseService = new PurchaseService()

        const userFound = await purchaseValidations.userValidation(user.id)
        const productFound = await purchaseValidations.productValidation(product.id)

        const purchase = purchaseService.createPurchase(userFound.id,product.id, productFound.price)
        purchaseService.makeTransaction(userFound, productFound)
        purchaseService.save(purchase)

        return response.status(202).json({ Message: "Transaction was successfully realized", purchase})
    }
}

export { PurchaseController }