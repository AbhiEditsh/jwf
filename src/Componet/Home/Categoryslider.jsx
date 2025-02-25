import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
import { Box, Container, Typography, CircularProgress } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getProducts } from "../../redux/actions/productActions";
import { Link } from "react-router-dom";

function CategorySlider() {
  const dispatch = useDispatch();

  // Fetch products from Redux state
  const productList = useSelector((state) => state.productList);
  const { products, loading, error } = productList;
  

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  // Extract unique categories
  const uniqueCategoryProducts = products?.reduce((acc, product) => {
    if (!acc.some((item) => item.category?.name === product.category?.name)) {
      acc.push(product);
    }
    return acc;
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 3,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <Box sx={{ my: 4 }}>
      <Container>
        <Box
          sx={{
            textAlign: "center",
            mb: 4,
          }}
        >
          <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
            Our Best Collection
          </Typography>
          <Box
            sx={{
              width: "100px",
              height: "4px",
              backgroundColor: "primary.main",
              margin: "0.5rem auto",
              borderRadius: "5px",
            }}
          ></Box>
        </Box>
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", my: 3 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography
            variant="body1"
            color="error"
            sx={{ textAlign: "center", my: 2 }}
          >
            Failed to load categories. Please try again later.
          </Typography>
        ) : uniqueCategoryProducts && uniqueCategoryProducts.length > 0 ? (
          <Slider {...settings}>
            {uniqueCategoryProducts.map((product) => (
              <Box key={product.id} sx={{ textAlign: "center", p: 2 }}>
                <Box
                  sx={{
                    width: "150px",
                    height: "150px",
                    borderRadius: "50%",
                    overflow: "hidden",
                    margin: "0 auto",
                  }}
                >
                  {product.ProductImage? (
                    <Link
                      to={`/category/${product.category?.name}`}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <img
                        src={product.ProductImage}
                        alt={product.category?.name || "Category"}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </Link>
                  ) : (
                    <Box
                      sx={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "#f0f0f0",
                        color: "#888",
                        fontSize: "12px",
                      }}
                    >
                      No Image
                    </Box>
                  )}
                </Box>
                <Typography variant="body2" sx={{ mt: 1, fontWeight: "bold" }}>
                  {product.category?.name || "Unknown Category"}
                </Typography>
              </Box>
            ))}
          </Slider>
        ) : (
          <Typography variant="body1" sx={{ textAlign: "center", my: 2 }}>
            No categories available.
          </Typography>
        )}
      </Container>
    </Box>
  );
}

export default CategorySlider;
