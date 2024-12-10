import React, { useEffect } from "react";
import { getProducts } from "../../redux/actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
import { Box, Container, Typography } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import theme from "../../theme/theme";
import { Link } from "react-router-dom";

function Categoryslider() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { products } = productList;

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  // Filter to get unique categories
  const uniqueCategoryProducts = products?.reduce((acc, product) => {
    if (!acc.find((item) => item.category.name === product.category.name)) {
      acc.push(product);
    }
    return acc;
  }, []);

  // Slick slider settings
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    arrows: false,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  return (
    <Box
      sx={{
        my: {
          xs: 3,
          md: 4,
        },
      }}
    >
      <Container>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            width: "100%",
            py: {
              xs: 2,
              md: 4,
            },
          }}
        >
          <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
            Our Best Collection
          </Typography>
          <Box
            sx={{
              width: "200px",
              display: "block",
              height: "3px",
              textAlign: "center",
              borderRadius: "50%",
              backgroundColor: theme.palette.primary.main,
            }}
          ></Box>
        </Box>
        <Slider {...settings}>
          {uniqueCategoryProducts && uniqueCategoryProducts.length > 0 ? (
            uniqueCategoryProducts.map((product, index) => (
              <div key={index} className="">
                <Box
                  sx={{
                    textAlign: "center",
                    padding: "10px",
                  }}
                >
                  <Link
                    to={`/category/${product.category.id}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <Box
                      sx={{
                        width: "150px",
                        height: "150px",
                        borderRadius: "50%",
                        overflow: "hidden",
                        margin: "0 auto",
                      }}
                    >
                      <div className="box_image">
                        <img
                          src={product.image}
                          alt={product.name}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      </div>
                    </Box>
                    <p>{product.category.name}</p>
                  </Link>
                </Box>
              </div>
            ))
          ) : (
            <p>Loading products...</p>
          )}
        </Slider>
      </Container>
    </Box>
  );
}

export default Categoryslider;
