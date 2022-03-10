import { createSlice } from "@reduxjs/toolkit"

const userInfoFromStorage = localStorage.getItem("userLogin")
  ? JSON.parse(localStorage.getItem("userLogin"))
  : {}

const initialState = { userLogin: userInfoFromStorage }

const userLoginSlice = createSlice({
  name: "userLogin",
  initialState,
  reducers: {
    userLoginRequest(state) {
      state.userLogin.loading = true
    },
    userLoginSuccess(state, action) {
      state.userLogin.loading = false
      state.userLogin.userInfo = action.payload
    },
    userLoginFail(state, action) {
      state.userLogin.loading = false
      state.userLogin.error = action.payload
    },
    userLogout(state) {
      state.userLogin.userInfo = null
    },
  },
})

export default userLoginSlice.reducer
export const userLoginActions = userLoginSlice.actions
