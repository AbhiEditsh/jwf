import React from "react";
import "../../assets/image/css/JwelleryGrid.css";
import { Box, Container } from "@mui/material";
function JwelleryGrid() {
  return (
    <Box 
    sx={{
      my: {
        xs: 4,
        md: 8,
      },
    }}
    >
      <Container>
        <div className="container scale-image">
          <img
            src="https://i.postimg.cc/NfqLyjL6/pendal-7.webp"
            alt="image1"
          />
          <img
            src="https://i.postimg.cc/y8fVT16r/istockphoto-1277517088-612x612.jpg"
            alt="image2"
          />
          <img
            src="https://i.postimg.cc/YShtn5h2/Jewelry-Stones-Black-background-542427-600x400.jpg"
            alt="image3"
          />
          <img
            src="https://i.postimg.cc/hvbnQg3s/indian-golden-jewels-necklace-generate-ai-photo.jpg"
            alt="image4"
          />
          <img
            src="https://i.postimg.cc/3JXN2QDP/Ring-1.webp"
            alt="imag5"
          />
        </div>
      </Container>
    </Box>
  );
}

export default JwelleryGrid;
