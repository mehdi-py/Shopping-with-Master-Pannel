import Product from "../models/productModel.js"
import catchAsync from "../utils/catchAsync.js"
import appError from "../utils/appError.js"

// @desc  Fetch All Products
// @ access  Public
// @ route GET/api/products/
export const getProducts = catchAsync(async (req, res, next) => {
  const products = await Product.find({})
  res.json(products)
})
// @desc  Fetch Single Product
// @ access  Public
// @ route GET/api/products/:id
export const getProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    res.json(product)
  } else {
    next(new appError("Product Not Found!", 404))
  }
})
