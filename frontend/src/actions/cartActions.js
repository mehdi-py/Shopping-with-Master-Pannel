import axios from "axios"
import { cartActions } from "../store/CartSlice"
import { cartShippingAddressActions } from "../store/cartShippingAddressSlice"
import { cartPaymentMethodActions } from "../store/cartPaymentMethodSlice"

//Adding item to Cart
export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`http://127.0.0.1:5000/api/products/${id}`)

  const { _id, name, image, price, countInStock } = data

  dispatch(
    cartActions.addCartItem({
      productId: _id,
      name: name,
      image: image,
      price: price,
      countInStock: countInStock,
      quantity: qty,
    })
  )

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems))
}
// Remove Item From Cart
export const removeCartItem = (id) => (dispatch, getState) => {
  dispatch(cartActions.removeCartItem(id))
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems))
}

// Shipping address

export const saveShippingAddress = (data) => (dispatch) => {
  dispatch(cartShippingAddressActions.cartShippingAddressSave(data))
  localStorage.setItem("shippingAddress", JSON.stringify(data))
}

export const savePaymentMethod = (data) => (dispatch) => {
  dispatch(cartPaymentMethodActions.paymentMethodSave(data))
  localStorage.setItem("paymentMethod", JSON.stringify(data))
}
