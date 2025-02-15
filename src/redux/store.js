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
  cartReducer,
  CartListReducer,
  removeCartReducer,
  wishlistReducer,
  WishListViewReducer,
  removeWishlistReducer,
  reviewCreateReducer,
  userReviewsReducer,
} from "./reducers/productReducer";

const rootReducer = combineReducers({
  //Other
  inquiry: inquiryReducer,
  //CLIENT REVIEW
  reviewList: ReviewListReducer,
  //Product
  productList: productListReducer,
  productDetails: productDetailsReducer,
  relatedProducts: relatedProductsReducer,
  productsByCategory: productsByCategoryReducer,
  ProductInquiry: ProductinquiryReducer,
  //Auth
  Register: registerReducer,
  Login: loginReducer,
  ForgotPassword: ForgotPasswordReducer,
  ResetPassword: ResetPasswordReducer,
  Logout: LogoutReducer,
  // User Profile
  userProfile: getUserProfileReducer,
  userUpdate: userUpdateReducer,
  // add to cart
  cart: cartReducer,
  cartList: CartListReducer,
  removeCart: removeCartReducer,
  //add wish list
  wish: wishlistReducer,
  wishlist: WishListViewReducer,
  removeWish: removeWishlistReducer,
  //Product Review
  reviewCreate: reviewCreateReducer,
  userReviews: userReviewsReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
