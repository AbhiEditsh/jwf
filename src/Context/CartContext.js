<<<<<<< HEAD
import { createContext, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  GetAddToCart,
  removeFromCart,
  clearCart,
  GetWishlist,
  addWishList,
  removeWishlist,
} from "../redux/actions/productActions";
=======
import { createContext, useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, GetAddToCart, removeFromCart } from "../redux/actions/productActions";
>>>>>>> Product-check
import { useAuth } from "./authContext";

// Create Context
const CartContext = createContext();

export const CartProvider = ({ children }) => {
<<<<<<< HEAD
  const { user } = useAuth();
  const userId = user ? user.user._id : null;

  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cartList);
  const wishlist = useSelector((state) => state.wishlist.wishlist);

  const [totalItems, setTotalItems] = useState(cart?.totalItems || 0);
  const [wishlistItems, setWishlistItems] = useState(wishlist?.totalItems || 0);

  // 📦 CART OPERATIONS
  useEffect(() => {
    if (userId) dispatch(GetAddToCart(userId));
  }, [dispatch, userId]);

  const addProductToCart = async (userId, productId, quantity) => {
    try {
      await dispatch(addToCart(userId, productId, quantity));
      dispatch(GetAddToCart(userId)); // Refresh cart
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  const removeProductFromCart = async (userId, productId) => {
    try {
      await dispatch(removeFromCart(userId, productId));
      dispatch(GetAddToCart(userId)); 
    } catch (error) {
      console.error("Error removing product from cart:", error);
    }
  };

  const clearCartHandler = async (userId) => {
    try {
      await dispatch(clearCart(userId));
      dispatch(GetAddToCart(userId)); 
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };

  useEffect(() => {
    setTotalItems(cart?.totalItems || 0);
  }, [cart]);

  useEffect(() => {
    if (userId) dispatch(GetWishlist(userId));
  }, [dispatch, userId]);

  const addProductToWishlist = async (userId, productId) => {
    try {
      await dispatch(addWishList(userId, productId));
      dispatch(GetWishlist(userId)); 
    } catch (error) {
      console.error("Error adding product to wishlist:", error);
    }
  };

  const removeProductFromWishlist = async (userId, productId) => {
    try {
      await dispatch(removeWishlist(userId, productId));
      dispatch(GetWishlist(userId)); 
    } catch (error) {
      console.error("Error removing product from wishlist:", error);
    }
  };

  useEffect(() => {
    setWishlistItems(wishlist?.totalItems || 0);
  }, [wishlist]);

  return (
    <CartContext.Provider
      value={{
        cart,
        totalItems,
        addProductToCart,
        removeProductFromCart,
        clearCartHandler,
        wishlist,
        wishlistItems,
        addProductToWishlist,
        removeProductFromWishlist,
      }}
    >
=======
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
>>>>>>> Product-check
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
