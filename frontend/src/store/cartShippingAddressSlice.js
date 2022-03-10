import { createSlice } from "@reduxjs/toolkit"

export const shippingFromLocalStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : {}

const initialState = { shippingAddress: shippingFromLocalStorage }

const cartShippingAddress = createSlice({
  name: "shippingcartsave",
  initialState,
  reducers: {
    cartShippingAddressSave(state, action) {
      state.shippingAddress = action.payload
    },
  },
})

export default cartShippingAddress.reducer
export const cartShippingAddressActions = cartShippingAddress.actions
