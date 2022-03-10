import axios from "axios"
import { userLoginActions } from "../store/userLoginSlice"
import { userRegisterActions } from "../store/userRegisterSlice"
import { userProfileActions } from "../store/userProfileSlice"
import { userProfileUpdateActions } from "../store/userProfileUpdateSlice"

//Register(Sign-Up)  Action
export const register = (name, email, password) => async (dispatch) => {
  try {
    dispatch(userRegisterActions.userRegisterRequest())
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    }
    const { data } = await axios.post(
      "http://127.0.0.1:5000/api/users",
      { name, email, password },
      config
    )
    dispatch(userRegisterActions.userRegisterSuccess(data))
    dispatch(userLoginActions.userLoginSuccess(data))
    const localStorageData = {
      userInfo: data,
    }

    localStorage.setItem("userLogin", JSON.stringify(localStorageData))
  } catch (error) {
    console.log("error", error)
    const err =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    dispatch(userRegisterActions.userRegisterFail(err))
  }
}

//Login Action
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch(userLoginActions.userLoginRequest())

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    }

    const { data } = await axios.post(
      "http://127.0.0.1:5000/api/users/login",
      { email, password },
      config
    )
    dispatch(userLoginActions.userLoginSuccess(data))

    const localStorageData = {
      userInfo: data,
    }
    localStorage.setItem("userLogin", JSON.stringify(localStorageData))
  } catch (error) {
    const err =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    dispatch(userLoginActions.userLoginFail(err))
  }
}

// LogOut Action
export const logout = () => (dispatch) => {
  localStorage.removeItem("userLogin")
  dispatch(userLoginActions.userLogout())
}

//user Profile  Action
export const getUserProfile = (id) => async (dispatch, getState) => {
  try {
    dispatch(userProfileActions.userProfileRequest())

    const token = getState().userLogin.userLogin.userInfo.token

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
    const { data } = await axios.get(
      `http://127.0.0.1:5000/api/users/${id}`,
      config
    )
    dispatch(userProfileActions.userProfileSuccess(data))
  } catch (error) {
    console.log("error", error)
    const err =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    dispatch(userProfileActions.userProfileFail(err))
  }
}

//user Profile Update Action
export const userProfileUpdate = (user) => async (dispatch, getState) => {
  try {
    dispatch(userProfileUpdateActions.userProfileUpdateRequest())

    const token = getState().userLogin.userLogin.userInfo.token

    const config = {
      headers: {
        "Content-Type": "application/json",

        Authorization: `Bearer ${token}`,
      },
    }
    const { data } = await axios.put(
      "http://127.0.0.1:5000/api/users/profile",
      user,
      config
    )
    dispatch(userProfileUpdateActions.userProfileUpdateSuccess(data))
    dispatch(userLoginActions.userLoginSuccess(data))
    const localStorageData = {
      userInfo: data,
    }
    localStorage.setItem("userLogin", JSON.stringify(localStorageData))
  } catch (error) {
    console.log("error", error)
    const err =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    dispatch(userProfileUpdateActions.userProfileUpdateFail(err))
  }
}
