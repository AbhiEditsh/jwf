import React, { useState, useEffect } from "react";
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
  useMediaQuery,
  Autocomplete,
  TextField,
} from "@mui/material";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { styled, useTheme } from "@mui/system";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios"; // Ensure axios is installed
import TopHeader from '../../src/Global/TopHeader'


const StyledAppBar = styled(AppBar)(({ theme, backgroundColor }) => ({
  backgroundColor: backgroundColor || theme.palette.background.paper,
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  // padding: "8px 24px",
  // margin: "0 auto",
  m: 0,
  transition: "background-color 0.3s ease-in-out",
  // position: "relative",
}));

const Header = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();
  const [backgroundColor, setBackgroundColor] = useState(
    theme.palette.background.paper
  );
  const [drawerState, setDrawerState] = useState({ menu: false });
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const menuItems = [
    { label: "Home", to: "/" },
    { label: "Collection", to: "/collection" },
    { label: "Contact Us", to: "/contact" },
  ];

  const toggleDrawer = (drawerName, open) => () => {
    setDrawerState((prevState) => ({ ...prevState, [drawerName]: open }));
  };

  const handleSearch = async (query) => {
    setSearchQuery(query);
    if (query) {
      try {
        const response = await axios.get(
          `https://jewellery01-back.onrender.com/api/products/search?query=${encodeURIComponent(
            query
          )}`
        );
        const { data } = response;
        if (data.success) {
          setSearchResults(data.products);
        } else {
          setSearchResults([]);
        }
      } catch (error) {
        console.error("Error fetching search results:", error.message);
        setSearchResults([]);
      }
    } else {
      setSearchResults([]);
    }
  };

  const handleProductSelect = (event, value) => {
    if (value) {
      navigate(`/product/${value._id}`);
      setSearchQuery("");
    }
  };

  const renderDrawerContent = () => (
    <Box sx={{ padding: 2, width: "300px", position: "relative" }}>
      <IconButton
        onClick={toggleDrawer("menu", false)}
        sx={{ position: "absolute", top: "8px", right: "8px" }}
      >
        <CloseIcon />
      </IconButton>
      {menuItems.map((item, index) => (
        <NavLink
          key={index}
          to={item.to}
          style={{ textDecoration: "none" }}
          onClick={toggleDrawer("menu", false)}
        >
          <Typography>{item.label}</Typography>
        </NavLink>
      ))}
    </Box>
  );

  return (
    <>
      <TopHeader/>
      <StyledAppBar
        backgroundColor={backgroundColor}
        sx={{
          py: 1,
          mx: {
            xs: 0,
            md: 0,
          },
          position:'relative'
        }}
      >
        <Toolbar
          sx={{
            justifyContent: "space-between",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          {/* Logo and Search Box on the same line */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              flexWrap: "wrap",
              justifyContent: "space-between",
              flexDirection: "row",
            }}
          >
            {/* Logo */}
            <Box
            sx={{ order: isSmallScreen ? "0" : "0" }}
            >
              <Link to="/" style={{ textDecoration: "none" }}>
                <Typography variant="h6">Logo</Typography>
              </Link>
            </Box>

            {/* Search Box */}
            <Box
              sx={{
                order: isSmallScreen ? "3" : "0",
                position: "relative",
                width: isSmallScreen ? "100%" : "50%",
                marginTop: isSmallScreen ? 2 : 0,
                marginLeft: isSmallScreen ? 0 : 2,
                marginBottom: isSmallScreen ? 2 : 0,
              }}
            >
              <Autocomplete
                freeSolo
                options={searchResults}
                getOptionLabel={(option) => option.name || ""}
                onInputChange={(event, newValue) => handleSearch(newValue)}
                onChange={handleProductSelect}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="Search products..."
                    variant="outlined"
                    size="small"
                    InputProps={{
                      ...params.InputProps,
                      startAdornment: (
                        <SearchIcon sx={{ marginLeft: 1, marginRight: 1 }} />
                      ),
                    }}
                  />
                )}
                renderOption={(props, option) => (
                  <Box
                    {...props}
                    key={option._id}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      cursor: "pointer",
                    }}
                  >
                    <img
                      src={option.image || "/placeholder-image.png"}
                      alt={option.name}
                      style={{
                        width: "40px",
                        height: "40px",
                        marginRight: "12px",
                        objectFit: "cover",
                        borderRadius: "4px",
                      }}
                    />
                    <Typography>{option.name}</Typography>
                  </Box>
                )}
              />
            </Box>

            {/* Menu Icon for small screens */}
            <Box
              sx={
                {
                  // order: isSmallScreen ? "2" : "3",
                }
              }
            >
              {isSmallScreen && (
                <IconButton onClick={toggleDrawer("menu", true)}>
                  <MenuIcon />
                </IconButton>
              )}
            </Box>

            {/* Menu Items for Desktop */}
            {!isSmallScreen && (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  // order: isSmallScreen ? "2" : "3",
                }}
              >
                {menuItems.map((item, index) => (
                  <NavLink
                    key={index}
                    to={item.to}
                    style={{
                      textDecoration: "none",
                      marginRight: "16px",
                      color: theme.palette.primary.main,
                    }}
                  >
                    {item.label}
                  </NavLink>
                ))}
              </Box>
            )}
          </Box>
        </Toolbar>

        {/* Drawer for small screens */}
        <Drawer
          anchor="left"
          open={drawerState.menu}
          onClose={toggleDrawer("menu", false)}
        >
          {renderDrawerContent()}
        </Drawer>
      </StyledAppBar>
    </>
  );
};

export default Header;
