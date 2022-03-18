import { createSlice } from "@reduxjs/toolkit"

const initialState = { loading: true, error: false, order: {} }

const orderDetailsSlice = createSlice({
  name: "orderdetails",
  initialState,
  reducers: {
    orderDetailsRequest(state) {
      state.loading = true
    },

    orderDetailsSuccess(state, action) {
      state.loading = false
      state.order = action.payload
    },

    orderDetailsFail(state, action) {
      state.loading = false
      state.error = action.payload
    },
  },
})

export default orderDetailsSlice.reducer
export const orderDetailsActions = orderDetailsSlice.actions
