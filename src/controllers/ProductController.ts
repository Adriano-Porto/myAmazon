import { Request, Response } from 'express'
import { ProductService } from '../services/ProductService'
import { ProductValidation } from '../validations/ProductValidation'

class ProductController {

    async create (request: Request, response: Response) {
        const productReceived = request.body
        const productValidation = new ProductValidation()

        let product

        await runValidations()
        product = await save()

        return response.status(200).json({
            Message: "Product Was Successfully saved",
            product
        })
        
        async function runValidations() {
            productValidation.dataValidation(productReceived)
            await productValidation.productAlreadyExists(productReceived)
            await productValidation.specialUserExists(productReceived.created_by)
        }

        async function save() {
            const productService = new ProductService()
            const product = await productService.save(productReceived)
            return product
        }
    }

    async getProduct (request: Request, response: Response) {
        const { name } = request.params
        const productService = new ProductService()

        const product = await productService.findByName(name)
        response.status(200).render("product", {
            name: product.name,
            description: product.description,
            price: product.price,
            quantity: 15,
            manufacturer: product.manufacturer,
            main_photo: product.main_photo,
            product_photos: product.product_photos
        })
    }
}
export { ProductController }