import { createSlice } from "@reduxjs/toolkit"

const initialState = {}

const orderCreateSlice = createSlice({
  name: "ordercreate",
  initialState,
  reducers: {
    addOrderRequest(state) {
      state.loading = true
    },

    addOrderSuccess(state, action) {
      state.loading = 0
      state.success = true
      state.order = action.payload
    },

    addOrderFail(state, action) {
      state.loading = false
      state.error = action.payload
    },
  },
})

export default orderCreateSlice.reducer
export const orderCreateActions = orderCreateSlice.actions
