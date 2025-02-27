// PRODUCT LIST
const productListInitialState = {
  products: [],
  loading: false,
  error: null,
};
export const productListReducer = (state = productListInitialState, action) => {
  switch (action.type) {
    case "PRODUCT_LIST_REQUEST":
      return { ...state, loading: true };
    case "PRODUCT_LIST_SUCCESS":
      return { ...state, loading: false, products: action.payload };
    case "PRODUCT_LIST_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
//PRODUCT DETAILS
const productDetailsInitialState = {
  loading: false,
  product: null,
  error: null,
};
export const productDetailsReducer = (
  state = productDetailsInitialState,
  action
) => {
  switch (action.type) {
    case "PRODUCT_DETAILS_REQUEST":
      return { ...state, loading: true };
    case "PRODUCT_DETAILS_SUCCESS":
      return { ...state, loading: false, product: action.payload };
    case "PRODUCT_DETAILS_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
//GET RELATED PRODUCT
const relatedProductsInitialState = {
  loading: false,
  products: [],
  error: null,
};

export const relatedProductsReducer = (
  state = relatedProductsInitialState,
  action
) => {
  switch (action.type) {
    case "RELATED_PRODUCTS_REQUEST":
      return { ...state, loading: true };
    case "RELATED_PRODUCTS_SUCCESS":
      return { ...state, loading: false, products: action.payload };
    case "RELATED_PRODUCTS_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
//CATEGORY WISE FILTER
const productsByCategoryInitialState = {
  loading: false,
  products: [],
  error: null,
};

export const productsByCategoryReducer = (
  state = productsByCategoryInitialState,
  action
) => {
  switch (action.type) {
    case "PRODUCTS_BY_CATEGORY_REQUEST":
      return { ...state, loading: true };
    case "PRODUCTS_BY_CATEGORY_SUCCESS":
      return { ...state, loading: false, products: action.payload };
    case "PRODUCTS_BY_CATEGORY_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
//USER INQUIRY
const inquiryInitialState = {
  loading: false,
  success: false,
  error: null,
};

export const inquiryReducer = (state = inquiryInitialState, action) => {
  switch (action.type) {
    case "INQUIRY_REQUEST":
      return { ...state, loading: true, success: action.payload };
    case "INQUIRY_SUCCESS":
      return { loading: false, success: true, data: action.payload };
    case "INQUIRY_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
// CLIENT REVIEW GET
const reviewListInitialState = {
  review: [],
  loading: false,
  error: null,
};

export const ReviewListReducer = (state = reviewListInitialState, action) => {
  switch (action.type) {
    case "REVIEW_LIST_REQUEST":
      return { ...state, loading: true };
    case "REVIEW_LIST_SUCCESS":
      return { ...state, loading: false, review: action.payload };
    case "REVIEW_LIST_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const ProductinquiryInitialState = {
  loading: false,
  success: false,
  error: null,
};

export const ProductinquiryReducer = (
  state = ProductinquiryInitialState,
  action
) => {
  switch (action.type) {
    case "PRODUCT_INQUIRY_REQUEST":
      return { ...state, loading: true, success: action.payload };
    case "PRODUCT_INQUIRY_SUCCESS":
      return { loading: false, success: true, data: action.payload };
    case "PRODUCT_INQUIRY_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
// Register
const RegisterInitialState = {
  loading: false,
  success: false,
  error: null,
};
export const registerReducer = (state = RegisterInitialState, action) => {
  switch (action.type) {
    case "REGISTER_REQUEST":
      return { ...state, loading: true, success: action.payload };
    case "REGISTER_SUCCESS":
      return { loading: false, success: true, data: action.payload };
    case "REGISTER_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

// Login
const LoginInitialState = {
  loading: false,
  success: false,
  error: null,
};
export const loginReducer = (state = LoginInitialState, action) => {
  switch (action.type) {
    case "LOGIN_REQUEST":
      return { ...state, loading: true, success: action.payload };
    case "LOGIN_SUCCESS":
      return { loading: false, success: true, data: action.payload };
    case "LOGIN_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

// FORGOT PASSWORD
const ForgotPasswordInitialState = {
  loading: false,
  success: false,
  error: null,
};
export const ForgotPasswordReducer = (
  state = ForgotPasswordInitialState,
  action
) => {
  switch (action.type) {
    case "FORGOT_REQUEST":
      return { ...state, loading: true, success: action.payload };
    case "FORGOT_SUCCESS":
      return { loading: false, success: true, data: action.payload };
    case "FORGOT_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

//RESET PASSWORD
const ResetPasswordInitialState = {
  loading: false,
  success: false,
  error: null,
};
export const ResetPasswordReducer = (
  state = ResetPasswordInitialState,
  action
) => {
  switch (action.type) {
    case "RESET_REQUEST":
      return { ...state, loading: true, success: action.payload };
    case "RESET_SUCCESS":
      return { loading: false, success: true, data: action.payload };
    case "RESET_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

//RESET PASSWORD
const LogoutInitialState = {
  loading: false,
  success: false,
  error: null,
};
export const LogoutReducer = (state = LogoutInitialState, action) => {
  switch (action.type) {
    case "LOGOUT_REQUEST":
      return { ...state, loading: true, success: action.payload };
    case "LOGOUT_SUCCESS":
      return { loading: false, success: true, data: action.payload };
    case "LOGOUT_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

//GET USER PROFILE
const UserProfileInitialState = {
  loading: false,
  success: false,
  data: null,
  error: null,
};
export const getUserProfileReducer = (
  state = UserProfileInitialState,
  action
) => {
  switch (action.type) {
    case "GET_USER_PROFILE_REQUEST":
      return { ...state, loading: true, success: false };
    case "GET_USER_PROFILE_SUCCESS":
      return {
        loading: false,
        success: true,
        data: action.payload,
        error: null,
      };
    case "GET_USER_PROFILE_FAIL":
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: false,
      };
    default:
      return state;
  }
};

//USER PROFILE UPDATE
const UpdateUserProfileInitialState = {
  loading: false,
  userInfo: JSON.parse(localStorage.getItem("userInfo")) || null,
  error: null,
};
export const userUpdateReducer = (
  state = UpdateUserProfileInitialState,
  action
) => {
  switch (action.type) {
    case "UPDATE_USER_PROFILE_REQUEST":
      return { ...state, loading: true };
    case "UPDATE_USER_PROFILE_SUCCESS":
      return { loading: false, userInfo: action.payload, error: null };
    case "UPDATE_USER_PROFILE_FAIL":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

//ADD TO CART
const AddToCartInitialState = {
  cartItems: [],
  loading: false,
  error: null,
};

export const cartReducer = (state = AddToCartInitialState, action) => {
  switch (action.type) {
    case "ADD_TO_CART_REQUEST":
      return { ...state, loading: true };

    case "ADD_TO_CART_SUCCESS":
      return { ...state, loading: false, cart: action.payload, error: null };

    case "ADD_TO_CART_FAIL":
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

//GET ADD TO CART
const CartListInitialState = {
  loading: false,
  cart: {
    items: [],
    totalPrice: 0,
  },
  error: null,
};

export const CartListReducer = (state = CartListInitialState, action) => {
  switch (action.type) {
    case "CART_LIST_REQUEST":
      return { ...state, loading: true };

    case "CART_LIST_SUCCESS":
      return { ...state, loading: false, cart: action.payload };

    case "CART_LIST_FAIL":
      return { ...state, loading: false, error: action.payload };
    case "CLEAR_CART":
      return { ...state, cart: { items: [], totalPrice: 0 }, error: null };
    default:
      return state;
  }
};

//REMOVE ADD TO CART
const removeCartInitialState = {
  loading: false,
  error: null,
};

export const removeCartReducer = (state = removeCartInitialState, action) => {
  switch (action.type) {
    case "REMOVE_FROM_CART_REQUEST":
      return { ...state, loading: true };
    case "REMOVE_FROM_CART_SUCCESS":
      return { ...state, loading: false, error: null };
    case "REMOVE_FROM_CART_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

//WISH LIST ADD
const wishListInitialState = {
  loading: false,
  wishlist: {
    items: [],
    totalItems: 0,
  },
  error: null,
};
export const wishlistReducer = (state = wishListInitialState, action) => {
  switch (action.type) {
    case "WISHLIST_REQUEST":
      return { ...state, loading: true };
    case "WISHLIST_SUCCESS":
      return {
        ...state,
        loading: false,
        wishlist: action.payload,
      };
    case "WISHLIST_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

//GET  WISHLIST PRODUCT
const wishListViewInitialState = {
  loading: false,
  wishlist: {
    items: [],
    totalItems: 0,
  },
  error: null,
};
export const WishListViewReducer = (
  state = wishListViewInitialState,
  action
) => {
  switch (action.type) {
    case "WISH_LIST_REQUEST":
      return { ...state, loading: true, error: null };
    case "WISH_LIST_SUCCESS":
      return {
        ...state,
        loading: false,
        wishlist:action.payload
      };
    case "WISH_LIST_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
//REMOVE WISH LIST
const removeWishlistInitialState = {
  loading: false,
  error: null,
  wishlist: [],
  wishlistCleared: false,
};

export const removeWishlistReducer = (state = removeWishlistInitialState, action) => {
  switch (action.type) {
    case "REMOVE_FROM_WISH_LIST_REQUEST":
      return { ...state, loading: true, wishlistCleared: false };

    case "REMOVE_FROM_WISH_LIST_SUCCESS":
      return { ...state, loading: false, error: null, wishlistCleared: false };

    case "REMOVE_FROM_WISH_LIST_FAIL":
      return { ...state, loading: false, error: action.payload };

    case "CLEAR_WISH_LIST":
      return {
        ...removeWishlistInitialState, // ✅ Reset everything using the initial state
        wishlistCleared: true, // ✅ Mark wishlist as cleared
      };

    default:
      return state;
  }
};

//PRODUCT REVIEW
const createReviewsInitialState = {
  loading: false,
  error: null,
  success: false,
};

export const reviewCreateReducer = (
  state = createReviewsInitialState,
  action
) => {
  switch (action.type) {
    case "CREATE_REVIEW_REQUEST":
      return { ...state, loading: true, error: null };
    case "CREATE_REVIEW_SUCCESS":
      return { ...state, loading: false, error: null, success: true };
    case "CREATE_REVIEW_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
//GET PRODUCT WISE REVIEWS
const getProductReviewsInitialState = {
  reviews: [],
  loading: false,
  error: null,
};

export const productReviewsReducer = (
  state = getProductReviewsInitialState,
  action
) => {
  switch (action.type) {
    case "FETCH_PRODUCT_REVIEWS_REQUEST":
      return { ...state, loading: true };
    case "FETCH_PRODUCT_REVIEWS_SUCCESS":
      return { loading: false, reviews: action.payload, error: null };
    case "FETCH_PRODUCT_REVIEWS_FAIL":
      return { loading: false, error: action.payload, reviews: [] };
    default:
      return state;
  }
};

//GET SINGLE USER WISE PRODUCT REVIEWS
const getUserReviewsInitialState = {
  reviews: [],
  loading: false,
  error: null,
};

export const UserReviewsReducer = (
  state = getUserReviewsInitialState,
  action
) => {
  switch (action.type) {
    case "FETCH_USER_REVIEWS_REQUEST":
      return { ...state, loading: true };
    case "FETCH_USER_REVIEWS_SUCCESS":
      return { loading: false, reviews: action.payload, error: null };
    case "FETCH_USER_REVIEWS_FAIL":
      return { loading: false, error: action.payload, reviews: [] };
    default:
      return state;
  }
};
//SEARCH PRODUCTS
const SearchinitialState = {
  searchResults: [],
  loading: false,
  error: null,
};

export const productSearchReducer = (state = SearchinitialState, action) => {
  switch (action.type) {
    case "SEARCH_PRODUCTS_REQUEST":
      return { ...state, loading: true, searchResults: [] };
    case "SEARCH_PRODUCTS_SUCCESS":
      return { ...state, loading: false, searchResults: action.payload };
    case "SEARCH_PRODUCTS_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
//USER ORDER LIST
const UserOrderInitialState = {
  loading: false,
  orders: [],
  error: null,
};

export const userOrdersReducer = (state = UserOrderInitialState, action) => {
  switch (action.type) {
    case "GET_USER_ORDERS_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "GET_USER_ORDERS_SUCCESS":
      return {
        ...state,
        loading: false,
        orders: action.payload,
      };
    case "GET_USER_ORDERS_FAIL":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

const OrderCreateInitialState = {
  order: null,
  loading: false,
  error: null,
  paymentData: null,
};
//CLEAR CART
const ClearCartinitialState = {
  cart: {
    items: [],
    totalItems: 0,
    totalPrice: 0,
  },
};

export const cartsReducer = (state = ClearCartinitialState, action) => {
  switch (action.type) {
    case "CLEAR_CART":
      return {
        ...state,
        cart: {
          items: [],
          totalItems: 0,
          totalPrice: 0,
        },
      };
    case "ADD_TO_CART":
      return {
        ...state,
        cart: {
          ...state.cart,
          items: action.payload.items,
          totalItems: action.payload.items.reduce(
            (acc, item) => acc + item.quantity,
            0
          ),
        },
      };
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: {
          ...state.cart,
          items: action.payload.items,
          totalItems: action.payload.items.reduce(
            (acc, item) => acc + item.quantity,
            0
          ),
        },
      };
    default:
      return state;
  }
};

//CREATE ORDER
export const orderReducer = (state = OrderCreateInitialState, action) => {
  switch (action.type) {
    case "CREATE_ORDER_REQUEST":
    case "PROCESS_PAYMENT_REQUEST":
    case "VERIFY_PAYMENT_REQUEST":
      return { ...state, loading: true };

    case "CREATE_ORDER_SUCCESS":
      return { ...state, loading: false, order: action.payload };

    case "PROCESS_PAYMENT_SUCCESS":
      return { ...state, loading: false, paymentData: action.payload };

    case "VERIFY_PAYMENT_SUCCESS":
      return {
        ...state,
        loading: false,
        order: { ...state.order, ...action.payload },
      };

    case "CREATE_ORDER_FAIL":
    case "PROCESS_PAYMENT_FAIL":
    case "VERIFY_PAYMENT_FAIL":
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};
