import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Tooltip,
  IconButton,
  AvatarGroup,
  Avatar,
  CircularProgress,
} from "@mui/material";
import { Stack, styled } from "@mui/system";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import FavoriteIcon from "@mui/icons-material/Favorite";
import theme from "../../theme/theme";
import { useCart } from "../../Context/CartContext";
import { useAuth } from "../../Context/authContext";
import MuiModal from "../Modal/MuiModal";
import { showToast } from "../Message/MuiMessage";
import { ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
import ProductModel from "../../Collection/ProductModel";

const ProductCard = styled(Card)(() => ({
  position: "relative",
  maxWidth: 250,
  width: 250, // This sets a fixed width
  borderRadius: "20px",
  transition: "transform 0.3s ease-in-out",
  "&:hover": {
    transform: "translateY(-4px) scale(1.02)",
  },
}));

const HoverOverlay = styled(Box)(({ theme }) => ({
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
  backgroundColor: "rgba(0, 0, 0, 0.95)",
  padding: theme.spacing(1),
  transform: "translateY(100%)",
  transition: "transform 0.3s ease-in-out",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}));

const MuiCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [load, setLoad] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [openProductModal, setopenProductModal] = useState(false);
  const { user } = useAuth();
  const userId = user ? user.user._id : null;
  const {
    addProductToCart,
    removeProductFromWishlist,
    addProductToWishlist,
    wishlist,
  } = useCart();

  //quick view modal
  const handleOpenModal = (product) => {
    setSelectedProduct(product);
    setopenProductModal(true);
  };

  const handleCloseModal = () => {
    setopenProductModal(false);
    setSelectedProduct(null);
  };
  useEffect(() => {
    if (wishlist?.wishlist?.items && product) {
      const demo = wishlist.wishlist.items.some(
        (item) => item.productId === product._id && item.liked
      );
      console.log(demo);

      setIsWishlisted(demo);
    }
  }, [wishlist.wishlist, product]);
  //add to cart
  const handleAddToCart = () => {
    if (!userId) {
      setOpenModal(true);
      showToast.warning("Please log in to add items to the cart");
      return;
    }

    addProductToCart(userId, product._id, 1);
    showToast.success("Added to Cart");
  };
  //Add to wishlist
  const handleAddToWishlist = async () => {
    if (!userId) return setOpenModal(true);
    setLoad(true);

    try {
      if (isWishlisted) {
        await removeProductFromWishlist(userId, product._id);
        showToast.success("Removed from Wishlist");
      } else {
        await addProductToWishlist(userId, product._id);
        showToast.success("Added to Wishlist");
      }

      setIsWishlisted(!isWishlisted);
    } catch (error) {
      console.error("Error handling wishlist toggle:", error.message);
      showToast.error("Failed to update Wishlist");
    } finally {
      setLoad(false);
    }
  };

  return (
    <Box sx={{ position: "relative", width: "fit-content" }}>
      <ToastContainer position="top-center" />
      <ProductCard
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        aria-label={`Product card for ${product.name}`}
      >
        <CardMedia
          component="img"
          height="200"
          width="200"
          image={product.ProductImage || "https://via.placeholder.com/240"}
          alt={product.name}
          sx={{ objectFit: "cover" }}
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/240";
          }}
        />

        <CardContent>
          <Link to={`/product/${product._id}`}>
            <Typography
              gutterBottom
              sx={{
                color: theme.palette.primary.main,
                textAlign: "center",
                fontSize: "16px",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                mb: 1,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {product.name}
            </Typography>
            <Typography
              sx={{
                color: theme.palette.primary.main,
                textAlign: "center",
                fontSize: "16px",
                fontWeight: "bold",
              }}
            >
              ₹{product.price}
              <span
                style={{
                  color: theme.palette.grey.main,
                  marginLeft: "10px",
                  textDecoration: "line-through",
                }}
              >
                ₹{product.oldPrice}
              </span>
            </Typography>
          </Link>
        </CardContent>
        <HoverOverlay
          sx={{ transform: isHovered ? "translateY(0)" : "translateY(100%)" }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Box>
              <Stack spacing={4}>
                <AvatarGroup max={4} spacing={15}>
                  <Avatar
                    alt="Remy Sharp"
                    style={{
                      width: "30px",
                      height: "30px",
                    }}
                    src={
                      product.ProductImage || "https://via.placeholder.com/240"
                    }
                  />
                  <Avatar
                    alt="Remy Sharp"
                    src={
                      product.ProductImage || "https://via.placeholder.com/240"
                    }
                    style={{
                      width: "30px",
                      height: "30px",
                    }}
                  />
                  <Avatar
                    alt="Remy Sharp"
                    src={
                      product.ProductImage || "https://via.placeholder.com/240"
                    }
                    style={{
                      width: "30px",
                      height: "30px",
                    }}
                  />
                  <Avatar
                    alt="Remy Sharp"
                    src={
                      product.ProductImage || "https://via.placeholder.com/240"
                    }
                    style={{
                      width: "30px",
                      height: "30px",
                    }}
                  />
                </AvatarGroup>
              </Stack>
            </Box>
            <Box>
              <Tooltip title="Quick View" arrow>
                <IconButton
                  onClick={() => handleOpenModal(product)}
                  aria-label="Quick View"
                  sx={{
                    padding: 0,
                  }}
                >
                  <RemoveRedEyeIcon
                    sx={{
                      color: theme.palette.white.main,
                      border: `1px solid ${theme.palette.white.main}`,
                      borderRadius: "50%",
                      padding: "2px",
                      fontSize: "30px",
                      marginLeft: "6px",
                    }}
                  />
                </IconButton>
              </Tooltip>
              <Tooltip title="Add to shopping cart" arrow>
                <IconButton
                  color="secondary"
                  onClick={handleAddToCart}
                  aria-label="Add to Cart"
                  sx={{
                    padding: 0,
                  }}
                >
                  <ShoppingBasketIcon
                    sx={{
                      color: theme.palette.white.main,
                      border: `1px solid ${theme.palette.white.main}`,
                      borderRadius: "50%",
                      padding: "2px",
                      fontSize: "30px",
                      marginLeft: "6px",
                    }}
                  />
                </IconButton>
              </Tooltip>
              <Tooltip title="Add to wishlist" arrow>
                <IconButton
                  color="secondary"
                  onClick={handleAddToWishlist}
                  aria-label="Add to wishlist"
                >
                  {load ? (
                    <CircularProgress size={24} sx={{ color: "white" }} />
                  ) : isWishlisted ? (
                    <FavoriteIcon
                      sx={{
                        color: "#ff0000",
                        border: `1px solid ${theme.palette.white.main}`,
                        borderRadius: "50%",
                        padding: "6px",
                        fontSize: "30px",
                        marginLeft: "2px",
                      }}
                    />
                  ) : (
                    <FavoriteBorderIcon
                      sx={{
                        color: "#ddd",
                        border: `1px solid ${theme.palette.white.main}`,
                        padding: "6px",
                        borderRadius: "50%",
                        fontSize: "30px",
                        marginLeft: "2px",
                      }}
                    />
                  )}
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
        </HoverOverlay>
      </ProductCard>

      {/*  LOGIN MODAL  */}
      <MuiModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        message="Please log in First🔐"
        onConfirm={() => setOpenModal(false)}
      />

      {/* QUICK VIEW MODAL */}
      {openProductModal && selectedProduct && (
        <ProductModel
          product={selectedProduct}
          open={openProductModal}
          onClose={handleCloseModal}
        />
      )}
    </Box>
  );
};

export default MuiCard;
