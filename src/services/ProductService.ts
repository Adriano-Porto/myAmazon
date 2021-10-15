import { getCustomRepository } from "typeorm"
import { ProductRepository } from "../repositories/ProductRepository"

interface productInterface {
    quantity: any,
    value: number,
    name: string,
    description: string,
    manufacturer: string,
    images: string,
    main_photo: string,
}

class ProductService {
    private productRepository = getCustomRepository(ProductRepository)

    async findByName(name : string) {
        const productFound = await this.productRepository.findOne({
            where: { name:name }
        })

        if(!productFound){
            throw new Error("A product with name '"+ name +"' not exists or have been removed")
        }
        return productFound
    }
    
    async save (productReceived: productInterface ) {
        const product = this.productRepository.create(productReceived)
        await this.productRepository.save(product)
        return product
    }

    async load (quantity: number){

        const feed = await this.productRepository
            .createQueryBuilder("products")
            .select([
                "products.id",
                "products.name",
                "products.price",
                "products.manufacturer",
                "products.main_photo"
            ])
            .take(quantity)
            .getMany()
        return feed
    }
}

export { ProductService }