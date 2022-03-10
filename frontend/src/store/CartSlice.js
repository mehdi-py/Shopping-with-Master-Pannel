import { createSlice } from "@reduxjs/toolkit"

const cartItemsFromLocalStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : []

const initialState = {
  cartItems: cartItemsFromLocalStorage,
  ItemsPrice: 0,
  ItemsTax: 0,
  ItemsShipping: 0,
  ItemsTotalPrice: 0,
}

const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCartItem(state, action) {
      const selectedProduct = action.payload
      const exsitingItemIndex = state.cartItems.findIndex(
        (item) => item.productId === selectedProduct.productId
      )
      if (exsitingItemIndex === -1) {
        state.cartItems.push(selectedProduct)
      } else {
        state.cartItems[exsitingItemIndex] = selectedProduct
      }
    },
    removeCartItem(state, action) {
      const id = action.payload
      state.cartItems = state.cartItems.filter((item) => item.productId !== id)
    },
  },
})
export default CartSlice.reducer
export const cartActions = CartSlice.actions
