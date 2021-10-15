import { Router } from 'express'
import { ProductController } from './controllers/ProductController'
import { UserController } from './controllers/UserController'
import { SpecialUserController } from './controllers/SpecialUserController'
import { FeedController } from './controllers/FeedController'
import { PurchaseController } from './controllers/PurchaseController'

const router = Router()

const productController = new ProductController()
const userController = new UserController()
const specialUserController = new SpecialUserController()
const feedController = new FeedController()
const purchaseController = new PurchaseController()

router.post("/login", userController.login)

router.get("/getFeed", feedController.load)
router.get("/product/:name", productController.getProduct)

router.post("/createPurchase", purchaseController.create)
router.post("/createProduct", productController.create)
router.post("/createUser", userController.create)
router.post("/createSpecialUser", specialUserController.create)

export { router }