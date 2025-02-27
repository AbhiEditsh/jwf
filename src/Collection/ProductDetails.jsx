import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Typography,
  CircularProgress,
  Grid,
  Container,
  Breadcrumbs,
  Divider,
  Button,
  Tabs,
  Tab,
} from "@mui/material";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";
import {
  getProductDetails,
  getRelatedProducts,
} from "../redux/actions/productActions";
import theme from "../theme/theme";
import ProductModel from "./ProductModel";
import InquiryModel from "./InquiryModel";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import RelatedProducts from "./RelatedProducts ";
import ProductReviewCreate from "./ProductReview/ProductReviewCreate";
import ProductReviewView from "./ProductReview/ProductReviewView";
import PropTypes from "prop-types";
import { useAuth } from "../Context/authContext";
import { useCart } from "../Context/CartContext";
import MuiModal from "../Global/Modal/MuiModal";

function ProductDetails() {
  const { user } = useAuth();
  const userId = user ? user.user._id : null;
  const {
    addProductToCart,
    removeProductFromWishlist,
    addProductToWishlist,
    wishlist,
  } = useCart();
  const { productId } = useParams();
  const [navValue, setNavValue] = useState(0);
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, product, error } = productDetails;
  const [openModal, setOpenModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [load, setLoad] = useState(false);
  const [openInquiryModal, setOpenInquiryModal] = useState(false);
  const { products: relatedProducts, loading: relatedLoading } = useSelector(
    (state) => state.relatedProducts
  );
  const productUrl = `${window.location.origin}/product/${productId}`;
  useEffect(() => {
    dispatch(getProductDetails(productId));
    dispatch(getRelatedProducts(productId));
  }, [dispatch, productId]);
  const handleOpenModal = (product) => {
    setSelectedProduct(product);
    setOpenModal(true);
  };
  useEffect(() => {
    if (wishlist?.wishlist?.items && product) {
      const demo = wishlist.wishlist.items.some(
        (item) => item.productId === product._id && item.liked
      );
      setIsWishlisted(demo);
    }
  }, [wishlist.wishlist, product]);

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedProduct(null);
  };
  //Inquiry model
  const handleInquiryOpen = () => {
    setOpenInquiryModal(true);
  };
  const handleInquiryClose = () => {
    setOpenInquiryModal(false);
  };
  //add to cart
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

  function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
      </div>
    );
  }
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  const handleNavChange = (event, newValue) => {
    setNavValue(newValue);
  };
  CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography variant="h6" color="error">
        {error}
      </Typography>
    );
  }

  if (!product) {
    return <Typography variant="h6">Product not found</Typography>;
  }

  return (
    <Box
      sx={{
        py: {
          xs: 4,
          py: 8,
        },
      }}
    >
      <Container>
        {/*========Product Breecrumbs ========= */}
        <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 4 }}>
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            Home
          </Link>
          <Link
            to={`/category/${product.category.name}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            {product.category ? product.category.name : "Not available"}
          </Link>
          <Typography color="text.primary">{product.name}</Typography>
        </Breadcrumbs>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Box sx={{ textAlign: "center" }}>
              <Box
                sx={{
                  width: {
                    xs: " 100%",
                    md: " 100%",
                  },
                  height: {
                    xs: "400px",
                    md: "600px",
                  },
                }}
              >
                <Link to={`/product/${product._id}`}>
                  <img
                    src={product.ProductImage}
                    alt={`Product`}
                    className="ProductDetails_image"
                  />
                </Link>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ marginTop: 4 }}>
              <Typography variant="h5" fontWeight={"bold"} gutterBottom>
                {product.name}
              </Typography>
              <Typography variant="body1" gutterBottom fontWeight={"bold"}>
                {product.category ? product.category.name : "Not available"}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>SKU:</strong>
                <span style={{ marginLeft: "10px" }}> {product.sku}</span>
              </Typography>

              <Divider sx={{ my: 1 }} />
              <Typography gutterBottom>{product.description}</Typography>
              <Box>
                <Typography variant="body1" gutterBottom>
                  <b style={{ marginRight: "5px" }}>Category:</b>
                  <Link
                    to={`/category/${product.category.name}`}
                    style={{
                      textDecoration: "none",
                      color: theme.palette.grey.main,
                      display: "inline-block",
                    }}
                  >
                    {product.category ? product.category.name : "Not available"}
                  </Link>
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
              </Box>
              <Divider sx={{ my: 1 }} />

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
                <Box onClick={handleWishlistToggle} sx={{ cursor: "pointer" }}>
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
          <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={navValue}
                onChange={handleNavChange}
                aria-label="basic tabs example"
              >
                <Tab label="Description" {...a11yProps(0)} />
                <Tab label="Reviews" {...a11yProps(1)} />
              </Tabs>
            </Box>
            <CustomTabPanel value={navValue} index={0}>
              <Typography variant="body1" gutterBottom>
                {product.description}
              </Typography>
            </CustomTabPanel>
            <CustomTabPanel value={navValue} index={1}>
              <Grid row container spacing={2}>
                <Grid item xs={12} lg={6}>
                  <ProductReviewCreate productId={product._id} />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <ProductReviewView productId={product._id} />
                </Grid>
              </Grid>
            </CustomTabPanel>
          </Box>
        </Grid>
        <Box sx={{ mt: 2 }}>
          <Box
            sx={{
              borderBottom: "1px solid #e1e1e1",
              mb: 2,
            }}
          >
            <Typography variant="h5" gutterBottom>
              Related Products
            </Typography>
            <Box
              sx={{
                width: {
                  xs: "100px",
                  md: "200px",
                },
                display: "block",
                height: "3px",
                textAlign: "center",
                borderRadius: "50%",
                backgroundColor: theme.palette.primary.main,
              }}
            ></Box>
          </Box>
          {relatedLoading ? (
            <Box sx={{ textAlign: "center", py: 2 }}>
              <CircularProgress />
            </Box>
          ) : (
            <RelatedProducts relatedProducts={relatedProducts} />
          )}
        </Box>
      </Container>

      {/*Product Details Modal */}
      {openModal && selectedProduct && (
        <ProductModel
          product={selectedProduct}
          open={openModal}
          onClose={handleCloseModal}
        />
      )}

      <InquiryModel
        open={openInquiryModal}
        onClose={handleInquiryClose}
        category={product.category.name}
      />

      <MuiModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        message="Please log in First🔐"
        onConfirm={() => setOpenModal(false)}
      />
    </Box>
  );
}

export default ProductDetails;
