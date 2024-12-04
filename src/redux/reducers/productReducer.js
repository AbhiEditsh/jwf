// src/redux/reducers/productReducer.js

// Initial state for product list
const productListInitialState = {
    products: [],
    loading: false,
    error: null,
  };
  
  // Reducer for product list
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
  
  // Initial state for product details
  const productDetailsInitialState = {
    loading: false,
    product: null,
    error: null,
  };
  
  // Reducer for single product details
  export const productDetailsReducer = (state = productDetailsInitialState, action) => {
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
  

  //Reducrer for Relelted Product
const relatedProductsInitialState = {
  loading: false,
  products: [],
  error: null,
};

export const relatedProductsReducer = (state = relatedProductsInitialState, action) => {
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
