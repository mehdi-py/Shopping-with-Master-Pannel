import express from "express"
import { getProducts, getProduct } from "../controllers/productControllers.js"

const router = express.Router()

// an alternative would be to write:
// router.get('/',getProducts)

router.route("/").get(getProducts)

router.route("/:id").get(getProduct)

export default router
