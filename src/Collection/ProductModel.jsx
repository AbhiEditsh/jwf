import React, { useRef } from "react";
import {
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import theme from "../theme/theme";
import { Link } from "react-router-dom";

const ProductModel = ({ open, onClose, product }) => {
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
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      sx={{
        "& .MuiPaper-root": {
          width: { xs: "100%", md: "30%" },
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          maxHeight: "90%",
        },
      }}
    >
      <DialogTitle>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent
        sx={{
          overflowY: "auto", // Enable vertical scrolling
          padding: "16px",
        }}
      >
        {product && (
          <Box>
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

              <Link to={`/product/${product._id}`}>
                <Slider ref={sliderRef} {...sliderSettings}>
                  {product.imageList?.map((image, index) => (
                    <Box key={index}>
                      <img
                        src={image}
                        alt={`Product ${index + 1}`}
                        style={{
                          width: "200px",
                          height: "200px",
                          borderRadius: "8px",
                          margin: "auto",
                        }}
                      />
                    </Box>
                  ))}
                </Slider>
              </Link>

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
            <Typography variant="h6" sx={{ mt: 2, textAlign: "center" }}>
              {product.name}
            </Typography>
            <Typography
              gutterBottom
              sx={{ fontSize: "14px", textAlign: "center", py: 1 }}
            >
              {product.description}
            </Typography>
            <Typography gutterBottom sx={{ textAlign: "center" }}>
              Price:
              <span
                style={{
                  color: theme.palette.primary.main,
                  paddingLeft: "10px",
                }}
              >
                {product.price}
              </span>
            </Typography>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ProductModel;
