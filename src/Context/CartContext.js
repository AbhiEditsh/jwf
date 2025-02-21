import { createContext, useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, GetAddToCart, removeFromCart } from "../redux/actions/productActions";
import { useAuth } from "./authContext";

// Create Context
const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useAuth(); 
  const userId = user ? user.id : null;

  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cartList);

  useEffect(() => {
    if (userId) {
      dispatch(GetAddToCart(userId));
    }
  }, [dispatch, userId]);

  const addProductToCart = (productId, quantity) => {
    dispatch(addToCart(userId, productId, quantity));
  };

  const removeProductFromCart = (productId) => {
    dispatch(removeFromCart(userId, productId));
  };

  return (
    <CartContext.Provider value={{ cart, addProductToCart, removeProductFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
