import { Request, Response } from 'express'
import { ProductService } from '../services/ProductService'

class FeedController {
    async load( request: Request, response: Response) {
        const productService = new ProductService()
        const feed = await productService.load(20)

        if(feed){
            console.log(feed)
            return response
                .status(200)
                .json(feed)
        } else {
            return response.status(404)
            .json({ Message: "Products weren't found"})
        }
    }
}

export { FeedController }