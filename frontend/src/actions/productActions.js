import axios from "axios"
import { productListActions } from "../store/productListSlice"
import { productDetailActions } from "../store/productDetailSlice"

export const listProducts = () => {
  return async (dispatch) => {
    dispatch(productListActions.productListRequest())

    const getProducts = async () => {
      return await axios.get("http://127.0.0.1:5000/api/products")
    }
    try {
      const { data } = await getProducts()
      dispatch(productListActions.productListSuccess(data))
      // set Items in local storage to reduce http request
      // localStorage.setItem("allProducts", JSON.stringify(data))
    } catch (error) {
      const err = error.response ? error.response.data.message : error.message
      console.log(error.response.data)
      dispatch(productListActions.productListFail(err))
    }
  }
}
export const ProductDetail = (id) => {
  return async (dispatch) => {
    dispatch(productDetailActions.productDetailRequest())

    // getting Items from localStorage:
    // const productsList = JSON.parse(localStorage.getItem("allProducts"))
    // const selectedProduct = productsList.find((el) => el._id === id)
    // console.log(selectedProduct)

    const getProduct = async () => {
      return await axios.get(`http://127.0.0.1:5000/api/products/${id}`)
    }
    try {
      const { data } = await getProduct()
      dispatch(productDetailActions.productDetailSuccess(data))
    } catch (error) {
      const err = error.response ? error.response.data.message : error.message
      console.log(error.response.data)
      dispatch(productDetailActions.productDetailFail(err))
    }
  }
}
