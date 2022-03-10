import { createSlice } from "@reduxjs/toolkit"

const initialState = { userProfileUpdate: {} }

const userProfileUpdateSlice = createSlice({
  name: "userprofileupdate",
  initialState,
  reducers: {
    userProfileUpdateRequest(state) {
      state.userProfileUpdate.loading = true
    },
    userProfileUpdateSuccess(state, action) {
      state.userProfileUpdate.loading = false
      state.userProfileUpdate.userInfo = action.payload
      state.userProfileUpdate.success = true
    },
    userProfileUpdateFail(state, action) {
      state.userProfileUpdate.loading = false
      state.userProfileUpdate.error = action.payload
    },
  },
})
export default userProfileUpdateSlice.reducer
export const userProfileUpdateActions = userProfileUpdateSlice.actions
