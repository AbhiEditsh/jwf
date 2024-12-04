import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Typography,
  CircularProgress,
  Grid,
  Container,
} from "@mui/material";
import ReactImageMagnify from "react-image-magnify";
import {
  getProductDetails,
  getRelatedProducts,
} from "../redux/actions/productActions";

function ProductDetails() {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState("");

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, product, error } = productDetails;

  const { products: relatedProducts, loading: relatedLoading } = useSelector(
    (state) => state.relatedProducts
  );

  // Fetch product details and related products
  useEffect(() => {
    dispatch(getProductDetails(productId));
    dispatch(getRelatedProducts(productId));
  }, [dispatch, productId]);

  // Set the initial selected image
  useEffect(() => {
    if (product?.imageList?.length > 0) {
      setSelectedImage(product.imageList[0]);
    }
  }, [product]);

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
        {/* Product Details */}
        <Typography variant="h4" gutterBottom>
          {product.name}
        </Typography>
        <Grid container spacing={3}>
          {/* Product Image Section */}
          <Grid item xs={12} md={6}>
            <Box sx={{ textAlign: "center" }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: "auto",
                }}
              >
                <ReactImageMagnify
                  {...{
                    smallImage: {
                      alt: "Selected product",
                      isFluidWidth: true,
                      src: selectedImage,
                    },
                    largeImage: { src: selectedImage, width: 800, height: 800 },
                    enlargedImageContainerDimensions: {
                      width: "50%",
                      height: "50%",
                    },
                    isHintEnabled: true,
                    lensStyle: { backgroundColor: "rgba(0,0,0,.6)" },
                  }}
                />
              </Box>
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
                      border: img === selectedImage ? "2px solid blue" : "none",
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
                <strong>Category:</strong> {product.category}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Price:</strong> ${product.price}
              </Typography>
              <Typography variant="body1">
                <strong>Description:</strong> {product.description}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Related Products Section */}
      <Box sx={{ mt: 6 }}>
        <Container>
          <Typography variant="h5" gutterBottom>
            Related Products
          </Typography>
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
                      <img
                        src={related.image} // Adjust the property based on your API
                        alt={related.name}
                        style={{
                          width: "100%",
                          height: "150px",
                          objectFit: "cover",
                          borderRadius: "8px",
                        }}
                      />
                      <Typography
                        variant="body1"
                        sx={{ mt: 1, fontWeight: 600 }}
                      >
                        {related.name}
                      </Typography>
                      <Typography variant="body2" sx={{ color: "gray" }}>
                        ${related.price}
                      </Typography>
                    </Link>
                  </Box>
                </Grid>
              ))}
            </Grid>
          )}
        </Container>
      </Box>
    </Box>
  );
}

export default ProductDetails;
