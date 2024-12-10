import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Fab, Zoom, useScrollTrigger } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import theme from "../theme/theme";

const ScrollToTop = ({ onClick }) => {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100, // Show button after 100px scroll
  });

  return (
    <Zoom in={trigger}>
      <Fab
        onClick={onClick}
        color="primary"
        size="small"
        sx={{
          position: "fixed",
          bottom: 80, // Positioned above the WhatsApp button
          right: 16,
          zIndex: 1000,
        }}
      >
        <KeyboardArrowUpIcon sx={{ color: theme.palette.white.main }} />
      </Fab>
    </Zoom>
  );
};

const WhatsAppButton = () => {
  const handleWhatsAppClick = () => {
    window.open("https://wa.me/1234567890", "_blank"); // Replace with your WhatsApp number
  };

  return (
    <Fab
      onClick={handleWhatsAppClick}
      color="success"
      size="small"
      sx={{
        position: "fixed",
        bottom: 16, // Positioned at the bottom-right corner
        right: 16,
        zIndex: 1000,
      }}
    >
      <WhatsAppIcon />
    </Fab>
  );
};

const Layout = ({ children }) => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Smooth scrolling
    });
  };

  return (
    <div>
      <Header />
      <main style={{ minHeight: "calc(100vh - 200px)" }}>{children}</main>
      <Footer />
      <ScrollToTop onClick={scrollToTop} />
      <WhatsAppButton />
    </div>
  );
};

export default Layout;
