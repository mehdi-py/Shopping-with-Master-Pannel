import { createSlice } from "@reduxjs/toolkit"

const initialState = { product: { reviews: [] }, loading: false, error: null }

const productDetailSlice = createSlice({
  name: "productDetail",
  initialState,
  reducers: {
    productDetailRequest(state) {
      state.loading = true
    },
    productDetailSuccess(state, action) {
      state.loading = false
      state.product = action.payload
    },
    productDetailFail(state, action) {
      state.loading = false
      state.error = action.payload
    },
  },
})

export default productDetailSlice.reducer
export const productDetailActions = productDetailSlice.actions
