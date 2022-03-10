import { configureStore } from "@reduxjs/toolkit"

import ProductListReducer from "./productListSlice"
import ProductDetailReducer from "./productDetailSlice"
import CartReducer from "./CartSlice"
import userLoginReducer from "./userLoginSlice"
import userRegisterReducer from "./userRegisterSlice"
import userProfileReducer from "./userProfileSlice"
import userProfileUpdateReducer from "./userProfileUpdateSlice"
import cartShippingAddressReducer from "./cartShippingAddressSlice"
import cartPaymentMethodReducer from "./cartPaymentMethodSlice"
import orderCreateReducer from "./orderCreateSlice"
export const store = configureStore({
  reducer: {
    productList: ProductListReducer,
    productdetail: ProductDetailReducer,
    cart: CartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userProfile: userProfileReducer,
    userProfileUpdate: userProfileUpdateReducer,
    cartShippingAddress: cartShippingAddressReducer,
    cartPaymentMethod: cartPaymentMethodReducer,
    orderCreate: orderCreateReducer,
  },
})
