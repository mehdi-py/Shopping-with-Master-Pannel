import { createSlice } from "@reduxjs/toolkit"

const initialState = { userProfile: {} }

const userProfileSlice = createSlice({
  name: "userProfile",
  initialState,
  reducers: {
    userProfileRequest(state) {
      state.userProfile.loading = true
    },
    userProfileSuccess(state, action) {
      state.userProfile.loading = false
      state.userProfile.user = action.payload
    },
    userProfileFail(state, action) {
      state.userProfile.loading = false
      state.userProfile.error = action.payload
    },
  },
})

export default userProfileSlice.reducer
export const userProfileActions = userProfileSlice.actions
