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

function ProductDetails() {
  const { productId } = useParams();
  const [navValue, setNavValue] = useState(0);
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, product, error } = productDetails;
  const user = JSON.parse(localStorage.getItem("user"));
  const [openModal, setOpenModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isWishlisted, setIsWishlisted] = useState(false);
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
      );
    }

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedProduct(null);
  };
  const handleInquiryOpen = () => {
    setOpenInquiryModal(true);
  };
  const handleInquiryClose = () => {
    setOpenInquiryModal(false);
  };

  const handleIncrement = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };
  const handleDecrement = () => {
    setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 1));
  };

  const handleAddToCart = () => {
      return;
    }
  };

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
                  width: "100%",
                  height: "600px",
                }}
              >
                  <img
                    src={product.ProductImage}
                    alt={`Product`}
                    style={{
                      width: "100%",

                      height: "100%",
                      objectFit: "cover",
                      borderRadius: "8px",
                      margin: "auto",
                    }}
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
                    <CircularProgress size={24} sx={{ color: "white" }} />
                  ) : isWishlisted ? (
                  ) : (
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
    </Box>
  );
}

export default ProductDetails;
