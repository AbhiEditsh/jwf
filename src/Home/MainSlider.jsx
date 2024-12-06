import React, { useState } from "react";
import { Carousel } from "antd";
import { useMediaQuery } from "@mui/material";

const MainSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const isMediumScreen = useMediaQuery("(max-width:960px)");

  const imgStyle = {
    width: "100%",
    height: isSmallScreen ? "300px" : isMediumScreen ? "500px" : "600px",
    objectFit: "cover",
  };

  const handleBeforeChange = (from, to) => {
    setCurrentSlide(to); // Update the current slide index
  };

  return (
    <Carousel
      autoplay
      effect="fade"
      autoplaySpeed={5000}
      dotPosition="right"
      dots={false}
      easing="ease-in-out"
      beforeChange={handleBeforeChange}
    >
      <div className="slider-item">
        <img
          src="https://i.postimg.cc/T37k9h4p/Untitled-design-1.jpg"
          alt="Jewelry Banner"
          style={imgStyle}
        />
        <div
          className={`slider-text ${
            currentSlide === 0 ? "animate-active" : ""
          }`} 
        >
          <h1>Luxury Redefined in Every Sparkle</h1>
          <p>Adorn Yourself with the Finest Jewelry, Crafted to Perfection</p>
        </div>
      </div>
      <div className="slider-item">
        <img
          src="https://i.postimg.cc/15c6PT0S/banner-img-4-orig.jpg"
          alt="Jewelry Banner"
          style={imgStyle}
        />
        <div
          className={`slider-text ${
            currentSlide === 1 ? "animate-active" : ""
          }`}
        >
          <h1>Crafted for the Modern You</h1>
          <p>
            Our Jewelry Radiates Elegance, Reflecting Your Unique Personality
          </p>
        </div>
      </div>
    </Carousel>
  );
};

export default MainSlider;
