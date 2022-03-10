import { createSlice } from "@reduxjs/toolkit"

const initialState = { userRegister: {} }

const userRegisterSlice = createSlice({
  name: "userRegister",
  initialState,
  reducers: {
    userRegisterRequest(state) {
      state.userRegister.loading = true
    },
    userRegisterSuccess(state, action) {
      state.userRegister.loading = false
      state.userRegister.userInfo = action.payload
    },
    userRegisterFail(state, action) {
      state.userRegister.loading = false
      state.userRegister.error = action.payload
    },
  },
})

export default userRegisterSlice.reducer
export const userRegisterActions = userRegisterSlice.actions
