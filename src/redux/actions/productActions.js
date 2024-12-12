import api from '../../utils/api';

export const getProducts = () => async (dispatch) => {
  try {
    dispatch({ type: 'PRODUCT_LIST_REQUEST' }); 
    const response = await api.get('/products');
    dispatch({
      type: 'PRODUCT_LIST_SUCCESS',
      payload: response.data.products, 
    });
  } catch (error) {
    dispatch({
      type: 'PRODUCT_LIST_FAIL',
      payload: error.response ? error.response.data.error : error.message,
    });
  }
};

export const getProductDetails = (productId) => async (dispatch) => {
    try {
      dispatch({ type: 'PRODUCT_DETAILS_REQUEST' });
      const response = await api.get(`/products/${productId}`);
      dispatch({
        type: 'PRODUCT_DETAILS_SUCCESS',
        payload: response.data.product,
      });
    } catch (error) {
      dispatch({
        type: 'PRODUCT_DETAILS_FAIL',
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
  


// actions/productActions.js
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
