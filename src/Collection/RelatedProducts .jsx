import React from "react";
import { Grid, Box, Typography, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import theme from "../theme/theme";

const RelatedProducts = ({ relatedProducts }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const handleOpenModal = (product) => {
    // Your modal opening logic here
  };

  return (
    <Box sx={{ position: "relative",}}>
      <Slider {...settings}>
        {relatedProducts.map((related) => (
          <div key={related._id}>
            <Box
              sx={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "16px",
                textAlign: "center",
                margin: "0 8px",
              }}
            >
              <Link
                to={`/product/${related._id}`}
                style={{ textDecoration: "none" }}
              >
                <div className="box_image">
                  <div>
                    {related.ProductImage ? (
                      <img
                        src={related.ProductImage}
                        alt={`Product`}
                        style={{
                          width: "100%",
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
                      onClick={() => handleOpenModal(related)}
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
          </div>
        ))}
      </Slider>
    </Box>
  );
};

const SampleNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <IconButton
      className={className}
      style={{
        ...style,
        display: "block",
        position: "absolute",
        top: "50%",
        left: "100%",
        transform: "translateY(-50%)",
        zIndex: 1,
        lineHeight:"50px",
        backgroundColor: theme.palette.primary.main,
      }}
      onClick={onClick}
    >
      <ArrowForwardIosIcon />
    </IconButton>
  );
};

const SamplePrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <IconButton
      className={className}
      style={{
        ...style,
        display: "block",
        position: "absolute",
        top: "50%",
        right: "100%",
        transform: "translateY(-50%)",
        zIndex: 1,
        lineHeight:"50px",
        backgroundColor: theme.palette.primary.main,
      }}
      onClick={onClick}
    >
      <ArrowBackIosIcon
      />
    </IconButton>
  );
};

export default RelatedProducts;
