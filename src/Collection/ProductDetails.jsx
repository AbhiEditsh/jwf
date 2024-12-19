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
} from "@mui/material";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import {
  getProductDetails,
  getRelatedProducts,
} from "../redux/actions/productActions";
import theme from "../theme/theme";
import ProductModel from "./ProductModel";
import InquiryModel from "./InquiryModel";
import ProductSlider from "./ProductSlider";

function ProductDetails() {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, product, error } = productDetails;
  const [openModal, setOpenModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [openInquiryModal, setOpenInquiryModal] = useState(false);
  const { products: relatedProducts, loading: relatedLoading } = useSelector(
    (state) => state.relatedProducts
  );
  const productUrl = `${window.location.origin}/product/${productId}`;
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(
    `Check out this product:
${product.name}

Price: ₹${product.price}
Description: ${product.description}

View more details here: ${productUrl}`
  )}`;

  useEffect(() => {
    dispatch(getProductDetails(productId));
    dispatch(getRelatedProducts(productId));
  }, [dispatch, productId]);
  const handleOpenModal = (product) => {
    setSelectedProduct(product);
    setOpenModal(true);
  };
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
            to={`/category/${product.category.id}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            {product.category ? product.category.name : "Not available"}
          </Link>
          <Typography color="text.primary">{product.name}</Typography>
        </Breadcrumbs>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Box sx={{ textAlign: "center" }}>
              <ProductSlider product={product} />
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ marginTop: 4 }}>
              <Typography variant="body1" gutterBottom fontWeight={"bold"}>
                {product.category ? product.category.name : "Not available"}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>SKU:</strong>
                {product.number}
              </Typography>

              <Divider sx={{ my: 1 }} />
              <Box>
                <Typography variant="body1" gutterBottom>
                  <strong style={{ marginRight: "5px" }}>Category</strong>
                  <Link
                    to={`/category/${product.category.id}`}
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
                  <span
                    style={{
                      marginRight: "10pox",
                      color: theme.palette.black.main,
                      fontWeighgt: "bold",
                    }}
                  >
                    &#8377;
                  </span>
                  {product.price}
                </Typography>
              </Box>
              <Divider sx={{ my: 1 }} />
              <Box>
                <Button
                  sx={{
                    mt: 1,
                    border: `1px solid ${theme.palette.primary.main}`,
                    borderRadius: "5%",
                  }}
                  size="small"
                  onClick={handleInquiryOpen}
                >
                  Inquiry Now
                </Button>
              </Box>
              {/* Share Section */}
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
                  <WhatsappShareButton>
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <WhatsappIcon size={20} round />
                    </a>
                  </WhatsappShareButton>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>

        {/* Related Products Section */}
        <Box sx={{ mt: 2 }}>
          {/* title */}
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
            <Grid container spacing={3}>
              {relatedProducts.map((related) => (
                <Grid item xs={12} sm={6} md={3} key={related._id}>
                  <Box
                    sx={{
                      border: "1px solid #ddd",
                      borderRadius: "8px",
                      padding: "16px",
                      textAlign: "center",
                    }}
                  >
                    <Link
                      to={`/product/${related._id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <div className="box_image">
                        <div>
                          {related.images?.[0] ? (
                            <img
                              src={related.images[0].url}
                              alt={`Product 1`}
                              style={{
                                width: "200px",
                                height: "200px",
                                borderRadius: "8px",
                                margin: "auto",
                              }}
                            />
                          ) : (
                            <p>No image available</p>
                          )}
                        </div>
                        <div className="hover_image">
                          <RemoveRedEyeIcon
                            sx={{
                              color: theme.palette.black.main,
                              cursor: "pointer",
                            }}
                            onClick={() => handleOpenModal(product)}
                          />
                        </div>
                      </div>
                      <Typography
                        variant="h6"
                        sx={{
                          color: theme.palette.primary.main,
                          textAlign: "center",
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          mb: 1,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {related.name}
                      </Typography>
                      <Typography
                        sx={{
                          color: theme.palette.grey.main,
                          textAlign: "center",
                          fontSize: "14px",
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          mb: 1,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {related.description}
                      </Typography>
                      <Typography
                        sx={{
                          color: theme.palette.grey.main,
                          textAlign: "center",
                          fontSize: "14px",
                        }}
                      >
                        <span
                          style={{
                            color: theme.palette.primary.main,
                            marginRight: "5px",
                          }}
                        >
                          &#x20B9;
                        </span>
                        {related.price}
                      </Typography>
                    </Link>
                  </Box>
                </Grid>
              ))}
            </Grid>
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
