import React, { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, IconButton } from "@mui/material";
import theme from "../theme/theme";
import { Link } from "react-router-dom";

function ProductSlider({ product }) {

  const sliderRef = useRef(null);

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };
  return (
    <>
      <Box sx={{ width: "100%", marginBottom: 2, position: "relative" }}>
        <IconButton
          onClick={() => sliderRef.current.slickPrev()}
          sx={{
            position: "absolute",
            top: "50%",
            left: "10px",
            width: "30px",
            height: "30px",
            transform: "translateY(-50%)",
            backgroundColor: theme.palette.primary.main,
            color: "#fff",
            zIndex: 2,
            "&:hover": {
              backgroundColor: theme.palette.primary.dark,
            },
          }}
        >
          ‹
        </IconButton>

        <Slider ref={sliderRef} {...sliderSettings}>
          {product.images?.map((image, index) => (
            <Box key={index}>
              <Link
                to={`/product/${product._id}`}
                style={{ textDecoration: "none" }}
              >
                <img
                  src={image.url}
                  alt={`Product ${index + 1}`}
                  style={{
                    width: "200px",
                    height: "200px",
                    borderRadius: "8px",
                    margin: "auto",
                  }}
                />
              </Link>
            </Box>
          ))}
        </Slider>

        <IconButton
          onClick={() => sliderRef.current.slickNext()}
          sx={{
            position: "absolute",
            top: "50%",
            right: "10px",
            transform: "translateY(-50%)",
            backgroundColor: theme.palette.primary.main,
            color: "#fff",
            zIndex: 2,
            width: "30px",
            height: "30px",
            "&:hover": {
              backgroundColor: theme.palette.primary.dark,
            },
          }}
        >
          ›
        </IconButton>
      </Box>
    </>
  );
}

export default ProductSlider;
