import api from "../../utils/api";
//GET PRODUCT LIST
export const getProducts = () => async (dispatch) => {
  try {
    dispatch({ type: "PRODUCT_LIST_REQUEST" });
    const response = await api.get("/product");
    dispatch({
      type: "PRODUCT_LIST_SUCCESS",
      payload: response.data.products,
    });
  } catch (error) {
    dispatch({
      type: "PRODUCT_LIST_FAIL",
      payload: error.response ? error.response.data.error : error.message,
    });
  }
};
//GET PRODUCT DETAILS
export const getProductDetails = (productId) => async (dispatch) => {
  try {
    dispatch({ type: "PRODUCT_DETAILS_REQUEST" });
    const response = await api.get(`/product/${productId}`);
    dispatch({
      type: "PRODUCT_DETAILS_SUCCESS",
      payload: response.data.product,
    });
  } catch (error) {
    dispatch({
      type: "PRODUCT_DETAILS_FAIL",
      payload: error.response ? error.response.data.error : error.message,
    });
  }
};
//GET REVIEW
export const getReview = () => async (dispatch) => {
  try {
    dispatch({ type: "REVIEW_LIST_REQUEST" });
    const response = await api.get("/review");
    dispatch({
      type: "REVIEW_LIST_SUCCESS",
      payload: response.data.reviews,
    });
  } catch (error) {
    dispatch({
      type: "REVIEW_LIST_FAIL",
      payload: error.response ? error.response.data.error : error.message,
    });
  }
};
//GET RELATED PRODUCT
export const getRelatedProducts = (productId) => async (dispatch) => {
  try {
    dispatch({ type: "RELATED_PRODUCTS_REQUEST" });
    const response = await api.get(`/product/related/${productId}`);
    dispatch({
      type: "RELATED_PRODUCTS_SUCCESS",
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: "RELATED_PRODUCTS_FAIL",
      payload: error.response ? error.response.data.error : error.message,
    });
  }
};
//CATEGORY WISE FILTER
export const getProductsByCategory = (category) => async (dispatch) => {
  try {
    dispatch({ type: "PRODUCTS_BY_CATEGORY_REQUEST" });
    const { data } = await api.get(`/product/category/${category}`);

    dispatch({
      type: "PRODUCTS_BY_CATEGORY_SUCCESS",
      payload: data.products,
    });
  } catch (error) {
    dispatch({
      type: "PRODUCTS_BY_CATEGORY_FAIL",
      payload: error.response ? error.response.data.message : error.message,
    });
  }
};
//USER INQUIRY
export const createInquiry = (inquiryData) => async (dispatch) => {
  try {
    dispatch({ type: "INQUIRY_REQUEST" });
    const { data } = await api.post("/inquiries", inquiryData);
    console.log(data);

    dispatch({
      type: "INQUIRY_SUCCESS",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "INQUIRY_FAIL",
      payload: error.response ? error.response.data.error : error.message,
    });
  }
};
//PRODUCT INQUIRY
export const createProductInquiry =
  (ProductinquiryData) => async (dispatch) => {
    try {
      dispatch({ type: "PRODUCT_INQUIRY_REQUEST" });
      const { data } = await api.post("/product-inquiries", ProductinquiryData);
      dispatch({
        type: "PRODUCT_INQUIRY_SUCCESS",
        payload: data.message,
      });
    } catch (error) {
      dispatch({
        type: "PRODUCT_INQUIRY_FAIL",
        payload: error.response ? error.response.data.error : error.message,
      });
    }
  };
//Register
export const RegisterData = (userData) => async (dispatch) => {
  try {
    dispatch({ type: "REGISTER_REQUEST" });
    const { data } = await api.post("/users/register", userData);

    dispatch({
      type: "REGISTER_SUCCESS",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "REGISTER_FAIL",
      payload: error.response ? error.response.data.error : error.message,
    });
  }
};
// Login
export const LoginData = (userData) => async (dispatch) => {
  try {
    dispatch({ type: "LOGIN_REQUEST" });
    const { data } = await api.post("/users/login", userData);

    dispatch({
      type: "LOGIN_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "LOGIN_FAIL",
      payload: error.response ? error.response.data.error : error,
    });
  }
};
//Forgot-password
export const ForgotData = (userData) => async (dispatch) => {
  try {
    dispatch({ type: "FORGOT_REQUEST" });
    const { data } = await api.post("/users/forgot-password", userData);

    dispatch({
      type: "FORGOT_SUCCESS",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "FORGOT_FAIL",
      payload: error.response ? error.response.data.error : error,
    });
  }
};
//Reset Password
export const ResetData = (userData) => async (dispatch) => {
  try {
    dispatch({
      type: "RESET_REQUEST",
    });
    const { data } = await api.post("/users/reset-password", userData);
    dispatch({
      type: "RESET_SUCCESS",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "RESET_FAIL",
      payload: error.response ? error.response.data.error : error,
    });
  }
};
//LOGOUT
export const Logout = (userData) => async (dispatch) => {
  try {
    dispatch({
      type: "LOGOUT_REQUEST",
    });
    const { data } = await api.post("/users/logout", userData);
    console.log(data);
    dispatch({
      type: "LOGOUT_SUCCESS",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "LOGOUT_FAIL",
      payload: error.response ? error.response.data.error : error,
    });
  }
};
//GET PROFILE
export const getUserProfile = () => async (dispatch) => {
  try {
    dispatch({ type: "GET_USER_PROFILE_REQUEST" });
    const { data } = await api.get("/users/profile");

    dispatch({
      type: "GET_USER_PROFILE_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "GET_USER_PROFILE_FAIL",
      payload: error.response ? error.response.data.error : error.message,
    });
  }
};
//PROFILE UPDATE
export const updateUserProfile = (userData) => async (dispatch, getState) => {
  try {
    dispatch({ type: "UPDATE_USER_PROFILE_REQUEST" });
    const { data } = await api.put("/users/update-user", userData);
    dispatch({ type: "UPDATE_USER_PROFILE_SUCCESS", payload: data });
  } catch (error) {
    dispatch({
      type: "UPDATE_USER_PROFILE_FAIL",
      payload: error.response?.data?.error || error.message,
    });
  }
};
//ADD TO CART
export const addToCart = (userId, productId, quantity) => async (dispatch) => {
  try {
    dispatch({ type: "ADD_TO_CART_REQUEST" });

    const { data } = await api.post("/cart/add", {
      userId,
      productId,
      quantity,
    });

    dispatch({ type: "ADD_TO_CART_SUCCESS", payload: data.cart });
  } catch (error) {
    dispatch({
      type: "ADD_TO_CART_FAIL",
      payload: error.response?.data?.message || "Something went wrong!",
    });
  }
};
//GET ADD TO CART
export const GetAddToCart = (userId) => async (dispatch) => {
  try {
    dispatch({ type: "CART_LIST_REQUEST" });
    const { data } = await api.get(`/cart`, { params: { userId } });
    dispatch({
      type: "CART_LIST_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "CART_LIST_FAIL",
      payload: error.response ? error.response.data.message : error.message,
    });
  }
};
//REMOVE CART
export const removeFromCart = (productId, userId) => async (dispatch) => {
  try {
    dispatch({
      type: "REMOVE_FROM_CART_REQUEST",
    });
    const { data } = await api.delete(`/cart/remove/${productId}`, {
      data: { userId },
    });
    dispatch({
      type: "REMOVE_FROM_CART_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "REMOVE_FROM_CART_FAIL",
      payload: error.response ? error.response.data.message : error.message,
    });
  }
};
// WISH LIST ADD
export const addWishList = (userId, productId) => async (dispatch) => {
  console.log(userId, productId);
  try {
    dispatch({ type: "ADD_TO_WISH_LIST_REQUEST" });
    const { data } = await api.post(`/wishlist/add`, { userId, productId });
    dispatch({
      type: "ADD_TO_WISH_LIST_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "ADD_TO_WISH_LIST_FAIL",
      payload: error.response ? error.response.data.message : error.message,
    });
  }
};
// WISH LIST ADD
export const GetWishlist = (userId) => async (dispatch) => {
  try {
    dispatch({ type: "WISH_LIST_REQUEST" });
    const { data } = await api.get(`/wishlist`, { params: { userId } });
    dispatch({
      type: "WISH_LIST_SUCCESS",
      payload: data.wishlist.items,
    });
  } catch (error) {
    dispatch({
      type: "WISH_LIST_FAIL",
      payload: error.response ? error.response.data.message : error.message,
    });
  }
};
//REMOVE WISHLIST
export const removeWishlist = (userId, productId) => async (dispatch) => {
  try {
    dispatch({
      type: "REMOVE_FROM_WISH_LIST_REQUEST",
    });
    const { data } = await api.delete(`/wishlist/remove`, {
      data: { userId, productId },
    });
    dispatch({
      type: "REMOVE_FROM_WISH_LIST_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "REMOVE_FROM_WISH_LIST_FAIL",
      payload: error.response ? error.response.data.message : error.message,
    });
  }
};
//PRODUCT REVIEW
export const createReview = (ReviewsData) => async (dispatch) => {
  try {
    dispatch({ type: "CREATE_REVIEW_REQUEST" });
    const { data } = await api.post(`/review/create`, ReviewsData);
    dispatch({
      type: "CREATE_REVIEW_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "CREATE_REVIEW_FAIL",
      payload: error.response ? error.response.data.message : error.message,
    });
  }
};
//GET PRODUCT WISE REVIEWS
export const getProductReviews = (productId) => async (dispatch) => {
  try {
    dispatch({ type: "FETCH_PRODUCT_REVIEWS_REQUEST" });

    const { data } = await api.get(`review/product/${productId}`);

    dispatch({
      type: "FETCH_PRODUCT_REVIEWS_SUCCESS",
      payload: data.reviews,
    });
  } catch (error) {
    dispatch({
      type: "FETCH_PRODUCT_REVIEWS_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};


export const getUserReviews = (userId) => async (dispatch) => {
  try {
    dispatch({ type: "FETCH_USER_REVIEWS_REQUEST" });
    const { data } = await api.get(`review/user`, {
      params: { userId }
    });
    console.log(data.reviews);
    
    dispatch({
      type: "FETCH_USER_REVIEWS_SUCCESS",
      payload: data.reviews,
    });
  } catch (error) {
    dispatch({
      type: "FETCH_USER_REVIEWS_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
//SEARCH PRODUCTS
export const searchProducts = (query) => async (dispatch) => {
  try {
    dispatch({ type: "SEARCH_PRODUCTS_REQUEST" });
    const { data } = await api.get(
      `product/search?query=${encodeURIComponent(
        query
      )}`
    );
    dispatch({
      type: "SEARCH_PRODUCTS_SUCCESS",
      payload: data.products,
    });
  } catch (error) {
    dispatch({
      type: "SEARCH_PRODUCTS_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
