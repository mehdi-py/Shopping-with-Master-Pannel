import Order from "../models/orderModel.js"
import catchAsync from "../utils/catchAsync.js"
import appError from "../utils/appError.js"

// @desc  Create new Orde
// @ route Post/api/orders/
// @ access  Protected
export const addOrderItems = catchAsync(async (req, res, next) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    ItemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body

  if (orderItems && orderItems.length === 0) {
    next(new appError("No Order Items", 400))
  } else {
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      ItemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    })
    const createdOrder = await order.save()

    res.status(201).json(createdOrder)
  }
})
