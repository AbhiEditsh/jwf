import React, { useState, useEffect } from "react";
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import { styled, useTheme } from "@mui/system";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const StyledAppBar = styled(AppBar)(({ theme, backgroundColor }) => ({
  backgroundColor: backgroundColor || theme.palette.background.paper,
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  padding: "8px 24px",
  margin: "0 auto",
  transition: "background-color 0.3s ease-in-out",
  position: "relative",
}));

const Header = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [backgroundColor, setBackgroundColor] = useState(
    theme.palette.background.paper
  );
  const [drawerState, setDrawerState] = useState({ menu: false });

  const menuItems = [
    { label: "Home", to: "/" },
    { label: "Collection", to: "/collection" },
    { label: "Contact Us", to: "/contact" },
  ];

  const toggleDrawer = (drawerName, open) => () => {
    setDrawerState((prevState) => ({ ...prevState, [drawerName]: open }));
  };

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setBackgroundColor(theme.palette.background.default);
    } else {
      setBackgroundColor(theme.palette.background.paper);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
    // eslint-disable-next-line
  }, []);

  const renderDrawerContent = () => (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: 2,
        gap: 2,
        width: "300px",
        position: "relative",
      }}
    >
      {/* Close Button */}
      <IconButton
        onClick={toggleDrawer("menu", false)}
        sx={{
          position: "absolute",
          top: "8px",
          right: "8px",
          color: theme.palette.text.primary,
        }}
        aria-label="close"
      >
        <CloseIcon />
      </IconButton>

      {/* Menu Items */}
      {menuItems.map((item, index) => (
        <NavLink
          key={index}
          to={item.to}
          style={{ textDecoration: "none", color: "inherit" }}
          onClick={toggleDrawer("menu", false)}
        >
          <Typography
            sx={{
              fontSize: "16px",
              fontWeight: "500",
            }}
          >
            {item.label}
          </Typography>
        </NavLink>
      ))}
    </Box>
  );

  return (
    <StyledAppBar backgroundColor={backgroundColor}>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: { xs: "8px 16px", sm: "0px 24px", lg: "0px 32px" },
        }}
      >
        {/* Logo Section */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            <Box
              component="img"
              sx={{
                height: `100%`,
                width: `100%`,
                maxHeight: { xs: 100, md: 100 },
                maxWidth: { xs: 100, md: 100 },
              }}
              alt="The Daimond Jewellery Logo."
              src="https://i.postimg.cc/L6jhsnJc/pngtree-diamond-jewellery-logo-design-vector-template-png-image-5648768-1-removebg-preview.png"
            />
          </Link>
        </Box>

        {/* Menu Section */}
        {isSmallScreen ? (
          <IconButton
            onClick={toggleDrawer("menu", true)}
            sx={{ color: theme.palette.primary.dark }}
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
        ) : (
          <Box sx={{ display: "flex", gap: 3 ,
          justifyContent:'center'}}>
            {menuItems.map((item, index) => (
              <NavLink
                key={index}
                to={item.to}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Typography
                  sx={{
                    fontSize: { xs: "12px", sm: "14px" },
                  }}
                >
                  {item.label}
                </Typography>
              </NavLink>
            ))}
          </Box>
        )}
      </Toolbar>

      {/* Drawer Section */}
      <Drawer
        anchor="left"
        open={drawerState.menu}
        onClose={toggleDrawer("menu", false)}
      >
        {renderDrawerContent()}
      </Drawer>
    </StyledAppBar>
  );
};

export default Header;
