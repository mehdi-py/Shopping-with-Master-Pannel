import { createSlice } from "@reduxjs/toolkit"

const initialState = { products: [], loading: false, error: null }

const productListSlice = createSlice({
  name: "productList",
  initialState,
  reducers: {
    productListRequest(state) {
      state.loading = true
    },
    productListSuccess(state, action) {
      state.loading = false
      state.products = action.payload
    },
    productListFail(state, action) {
      state.loading = false
      state.error = action.payload
    },
  },
})

export default productListSlice.reducer
export const productListActions = productListSlice.actions
