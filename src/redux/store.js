// src/redux/store.js
import { createStore, applyMiddleware } from "redux";
import { combineReducers } from "redux";
import { thunk } from "redux-thunk";
import {
  productDetailsReducer,
  productListReducer,
  relatedProductsReducer,
  productsByCategoryReducer,
  inquiryReducer,
  ReviewListReducer,
  ProductinquiryReducer,
  registerReducer,
  loginReducer,
  ForgotPasswordReducer,
  ResetPasswordReducer,
  LogoutReducer,
  getUserProfileReducer,
  userUpdateReducer,
} from "./reducers/productReducer";

const rootReducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  relatedProducts: relatedProductsReducer,
  productsByCategory: productsByCategoryReducer,
  inquiry: inquiryReducer,
  reviewList: ReviewListReducer,
  ProductInquiry: ProductinquiryReducer,
  Register: registerReducer,
  Login: loginReducer,
  ForgotPassword:ForgotPasswordReducer,
  ResetPassword:ResetPasswordReducer,
  Logout:LogoutReducer,
  // User Profile
  userProfile: getUserProfileReducer,
  userUpdate: userUpdateReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
