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
    itemsPrice,
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
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    })
    const createdOrder = await order.save()

    res.status(201).json(createdOrder)
  }
})
// @ desc Get Order By ID
// @route api/orders/:id
// @ access  Private

export const getOrderById = catchAsync(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  )

  if (order) {
    res.json(order)
  } else {
    next(
      new appError(
        "Please check the order number, your orde number is not exist."
      )
    )
  }
})
