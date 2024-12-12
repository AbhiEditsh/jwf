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

function ProductDetails() {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState("");
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, product, error } = productDetails;
  const [openModal, setOpenModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const { products: relatedProducts, loading: relatedLoading } = useSelector(
    (state) => state.relatedProducts
  );

  const productUrl = `${window.location.origin}/product/${productId}`;

  useEffect(() => {
    dispatch(getProductDetails(productId));
    dispatch(getRelatedProducts(productId));
  }, [dispatch, productId]);

  useEffect(() => {
    if (product?.imageList?.length > 0) {
      setSelectedImage(product.imageList[0]);
    }
  }, [product]);

  const handleOpenModal = (product) => {
    setSelectedProduct(product);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    alert("hello");
    setSelectedProduct(null);
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
    <Box sx={{ py: 8 }}>
      <Container>
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
          {/* Product Image Section */}
          <Grid item xs={12} md={6}>
            <Box sx={{ textAlign: "center" }}>
              <img
                src={selectedImage}
                alt="Selected product"
                style={{
                  width: "100%",
                  maxHeight: "500px",
                  objectFit: "contain",
                }}
              />
            </Box>
            {/* Thumbnail Slider */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                gap: 1,
                overflowX: "auto",
                mt: 2,
                padding: "8px",
              }}
            >
              {product.imageList.map((img, index) => (
                <Box key={index} sx={{ padding: 1 }}>
                  <img
                    src={img}
                    alt={`Thumbnail ${index}`}
                    style={{
                      width: "80px",
                      height: "80px",
                      cursor: "pointer",
                      objectFit: "cover",
                      borderRadius: "8px",
                      border:
                        img === selectedImage
                          ? `2px solid ${theme.palette.primary.main}`
                          : "none",
                    }}
                    onClick={() => setSelectedImage(img)}
                  />
                </Box>
              ))}
            </Box>
          </Grid>

          {/* Product Info Section */}
          <Grid item xs={12} md={6}>
            <Box sx={{ marginTop: 4 }}>
              <Typography variant="body1" gutterBottom>
                <strong>Category:</strong>
                {product.category ? product.category.name : "Not available"}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Price:</strong> ${product.price}
              </Typography>
              <Typography variant="body1">
                <strong>Description:</strong> {product.description}
              </Typography>

              {/* Share Section */}
              <Box sx={{ mt: 4 }}>
                <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                  <FacebookShareButton url={productUrl} quote={product.name}>
                    <FacebookIcon size={40} round />
                  </FacebookShareButton>
                  <TwitterShareButton
                    url={productUrl}
                    title={`Check out this product: ${product.name}`}
                  >
                    <TwitterIcon size={40} round />
                  </TwitterShareButton>
                  <WhatsappShareButton
                    url={productUrl}
                    title={`Check out this product: ${product.name}`}
                  >
                    <WhatsappIcon size={40} round />
                  </WhatsappShareButton>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Related Products Section */}
      <Box sx={{ mt: 6 }}>
        <Container>
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
                        <img
                          src={related.image}
                          alt={related.name}
                          width="100px"
                          height="230px"
                        />
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
                        }}
                      >
                        {related.name}
                      </Typography>
                      <Typography
                        sx={{
                          color: theme.palette.grey.main,
                          textAlign: "center",
                        }}
                      >
                        RS.{related.price}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {related.category.name}
                      </Typography>
                    </Link>
                  </Box>
                </Grid>
              ))}
            </Grid>
          )}
        </Container>
      </Box>
      {/* Modal */}
      {openModal && selectedProduct && (
        <ProductModel
          product={selectedProduct}
          open={openModal}
          onClose={handleCloseModal}
        />
      )}
    </Box>
  );
}

export default ProductDetails;
