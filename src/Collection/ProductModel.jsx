import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Modal,
  Grid,
  Divider,
  CircularProgress,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import theme from "../theme/theme";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Link, useParams } from "react-router-dom";
import { useCart } from "../Context/CartContext";
import { useAuth } from "../Context/authContext";
import MuiModal from "../Global/Modal/MuiModal";

const ProductModel = ({ open, onClose, product }) => {
  const { productId } = useParams();
  const { user } = useAuth();
  const userId = user ? user.user._id : null;
  const {
    addProductToCart,
    removeProductFromWishlist,
    addProductToWishlist,
    wishlist,
  } = useCart();
  const productUrl = `${window.location.origin}/product/${productId}`;
  const [quantity, setQuantity] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [load, setLoad] = useState(false);

  //Add to Cart
  const handleIncrement = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };
  const handleDecrement = () => {
    setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 1));
  };
  const handleAddToCart = () => {
    if (!userId) {
      setOpenModal(true);
      return;
    }
    addProductToCart(userId, product._id, quantity);
  };
  //Wish-list
  useEffect(() => {
    if (wishlist?.wishlist?.items && product) {
      const demo = wishlist.wishlist.items.some(
        (item) => item.productId === product._id && item.liked
      );
      setIsWishlisted(demo);
    }
  }, [wishlist.wishlist, product]);
  const handleWishlistToggle = async () => {
    if (!userId) return setOpenModal(true);

    setLoad(true);
    try {
      isWishlisted
        ? await removeProductFromWishlist(userId, product._id)
        : await addProductToWishlist(userId, product._id);

      setIsWishlisted(!isWishlisted);
    } catch (error) {
      console.error("Error handling wishlist toggle:", error.message);
    } finally {
      setLoad(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="product-modal"
      BackdropProps={{
        sx: {
          backdropFilter: "blur(5px)",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: "90%", md: "40%" },
          bgcolor: "white",
          borderRadius: "8px",
          boxShadow: 24,
          padding: "16px",
          overflowY: "auto",
          maxHeight: "90%",
          background: theme.palette.white.main,
        }}
      >
        {/* Close Button */}
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            top: "8px",
            right: "8px",
            color: theme.palette.grey[500],
            zIndex: 22,
          }}
        >
          <CloseIcon />
        </IconButton>
        {/* Product Content */}
        {product && (
          <Grid spacing={3} row container>
            <Grid item xs={12} lg={6}>
              <Box
                sx={{
                  width: {
                    xs: " 100%",
                    md: " 100%",
                  },
                  height: {
                    xs: "400px",
                  },
                }}
              >
                <img
                  src={product.ProductImage}
                  alt={`Product`}
                  className="ProductDetails_image"
                  style={{
                    objectFit: "cover",
                  }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} lg={6}>
              <Box>
                <Typography variant="body1" gutterBottom fontWeight={"bold"}>
                  {product.category ? product.category.name : "Not available"}
                </Typography>
                <Typography variant="h6" sx={{ mt: 2 }}>
                  {product.name}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <b style={{ marginRight: "5px" }}>Category:</b>
                  <Link
                    to={`/category/${product.category.name}`}
                    style={{
                      textDecoration: "none",
                      color: theme.palette.primary.main,
                      display: "inline-block",
                    }}
                  >
                    {product.category ? product.category.name : "Not available"}
                  </Link>
                </Typography>
                <Divider sx={{ my: 1 }} />
                <Typography gutterBottom sx={{ fontSize: "14px", py: 1 }}>
                  {product.description}
                </Typography>

                <Typography variant="body1" gutterBottom>
                  {product.oldPrice && <span>&#8377; {product.price}</span>}
                  <span
                    style={{
                      textDecoration: product.oldPrice
                        ? "line-through"
                        : "none",
                      marginLeft: "10px",
                      color: "red",
                    }}
                  >
                    &#8377; {product.oldPrice}
                  </span>
                </Typography>
                {/* Increment and Decrement Buttons */}
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 1, my: 2 }}
                >
                  <Box
                    sx={{
                      borderRadius: "50px",
                      p: 0.5,
                      border: `1px solid ${theme.palette.primary.main} `,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-around",
                      gap: 1,
                      width: "30%",
                    }}
                  >
                    <Box
                      sx={{
                        cursor: quantity > 1 ? "pointer" : "not-allowed",
                        opacity: quantity > 1 ? 1 : 0.5,
                        fontSize: "1.5rem",
                        userSelect: "none",
                      }}
                      onClick={handleDecrement}
                    >
                      -
                    </Box>
                    <Typography variant="body1">{quantity}</Typography>
                    <Box
                      sx={{
                        cursor: "pointer",
                        fontSize: "1.5rem",
                        userSelect: "none",
                      }}
                      onClick={handleIncrement}
                    >
                      +
                    </Box>
                  </Box>

                  <Button
                    sx={{
                      backgroundColor: theme.palette.black.main,
                      borderRadius: "50px",
                      p: "10px 30px",
                      color: theme.palette.white.main,
                    }}
                    size="small"
                    onClick={handleAddToCart}
                  >
                    Add to Cart
                  </Button>
                  <Box
                    onClick={handleWishlistToggle}
                    sx={{ cursor: "pointer" }}
                  >
                    {load ? (
                      <CircularProgress size={24} sx={{ color: "white" }} />
                    ) : isWishlisted ? (
                      <FavoriteIcon sx={{ color: "#ff0000" }} />
                    ) : (
                      <FavoriteBorderIcon sx={{ color: "#ddd" }} />
                    )}
                  </Box>
                </Box>
                <Box sx={{ my: 2 }}>
                  <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                    <span style={{ marginRight: "5px" }}>Share:</span>
                    <FacebookShareButton url={productUrl} quote={product.name}>
                      <FacebookIcon size={20} round />
                    </FacebookShareButton>
                    <TwitterShareButton
                      url={productUrl}
                      title={`Check out this product: ${product.name}`}
                    >
                      <TwitterIcon size={20} round />
                    </TwitterShareButton>
                    <WhatsappShareButton
                      url={productUrl}
                      title={`Check out this product: ${product.name}`}
                      media={product?.images?.[0]?.url}
                    >
                      <WhatsappIcon size={20} round />
                    </WhatsappShareButton>
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
        )}
        <MuiModal
          open={openModal}
          onClose={() => setOpenModal(false)}
          message="Please log in First🔐"
          onConfirm={() => setOpenModal(false)}
        />{" "}
      </Box>
    </Modal>
  );
};

export default ProductModel;
