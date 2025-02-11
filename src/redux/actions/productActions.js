import api from "../../utils/api";

export const getProducts = () => async (dispatch) => {
  try {
    dispatch({ type: "PRODUCT_LIST_REQUEST" });
    const response = await api.get("/products");
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

export const getProductDetails = (productId) => async (dispatch) => {
  try {
    dispatch({ type: "PRODUCT_DETAILS_REQUEST" });
    const response = await api.get(`/products/${productId}`);
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
export const getRelatedProducts = (productId) => async (dispatch) => {
  try {
    dispatch({ type: "RELATED_PRODUCTS_REQUEST" });
    const response = await api.get(`/products/related/${productId}`);
    dispatch({
      type: "RELATED_PRODUCTS_SUCCESS",
      payload: response.data.relatedProducts,
    });
  } catch (error) {
    dispatch({
      type: "RELATED_PRODUCTS_FAIL",
      payload: error.response ? error.response.data.error : error.message,
    });
  }
};

export const getProductsByCategory = (categoryId) => async (dispatch) => {
  try {
    dispatch({ type: "PRODUCTS_BY_CATEGORY_REQUEST" });
    const { data } = await api.get(`/categories/${categoryId}/products`);

    dispatch({
      type: "PRODUCTS_BY_CATEGORY_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "PRODUCTS_BY_CATEGORY_FAIL",
      payload: error.response ? error.response.data.message : error.message,
    });
  }
};

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

//GET PREOFILE
export const getUserProfile = () => async (dispatch) => {
  try {
    dispatch({ type: "GET_USER_PROFILE_REQUEST" });
    const { data } = await api.get("/users/profile");
    console.log(data);

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
