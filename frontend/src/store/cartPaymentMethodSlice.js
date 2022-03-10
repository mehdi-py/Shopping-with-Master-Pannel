import { createSlice } from "@reduxjs/toolkit"

export const paymentMethodFromLocalStorage = localStorage.getItem(
  "paymentMethod"
)
  ? JSON.parse(localStorage.getItem("paymentMethod"))
  : {}

const initialState = { paymentMethod: paymentMethodFromLocalStorage }

const cartPaymentMethodSlice = createSlice({
  name: "paymentmethod",
  initialState,
  reducers: {
    paymentMethodSave(state, action) {
      state.paymentMethod = action.payload
    },
  },
})

export default cartPaymentMethodSlice.reducer
export const cartPaymentMethodActions = cartPaymentMethodSlice.actions
