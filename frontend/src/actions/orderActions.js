import { orderCreateActions } from "../store/orderCreateSlice"
import { orderDetailsActions } from "../store/OrderDetailsSlice"

import axios from "axios"

export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch(orderCreateActions.addOrderRequest())

    const token = getState().userLogin.userLogin.userInfo.token

    const config = {
      headers: {
        "Content-Type": "application/json",

        Authorization: `Bearer ${token}`,
      },
    }
    const { data } = await axios.post(
      "http://127.0.0.1:5000/api/orders",
      order,
      config
    )
    dispatch(orderCreateActions.addOrderSuccess(data))
  } catch (error) {
    console.log("error", error)
    const err =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    dispatch(orderCreateActions.addOrderFail(err))
  }
}

export const orderDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch(orderDetailsActions.orderDetailsRequest())

    const token = getState().userLogin.userLogin.userInfo.token

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const { data } = await axios.get(
      `http://127.0.0.1:5000/api/orders/${id}`,

      config
    )
    dispatch(orderDetailsActions.orderDetailsSuccess(data))
  } catch (error) {
    console.log("error", error)
    const err =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    dispatch(orderCreateActions.addOrderFail(err))
  }
}
