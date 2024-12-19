import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import theme from "../theme/theme";
import ProductSlider from "./ProductSlider";

const ProductModel = ({ open, onClose, product }) => {
  if (!open) return null; 
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: theme.palette.white.main,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1300, 
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: { xs: "90%", md: "30%" },
          backgroundColor: "white",
          borderRadius: "8px",
          boxShadow: 24,
          padding: "16px",
          overflowY: "auto",
          maxHeight: "90%",
        }}
      >
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            top: "8px",
            right: "8px",
            color: theme.palette.grey[500],
            zIndex: '22',
          }}
        >
          <CloseIcon />
        </IconButton>
        {product && (
          <Box>
            <ProductSlider product={product} />
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
      </Box>
    </Box>
  );
};

export default ProductModel;
