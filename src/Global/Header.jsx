import React, { useEffect, useState } from "react";
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
  Badge,
  Menu,
  MenuItem,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { styled, useTheme } from "@mui/system";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import axios from "axios";
import TopHeader from "../../src/Global/TopHeader";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GetAddToCart, LoginData } from "../redux/actions/productActions";
import { Favorite, ShoppingCart } from "@mui/icons-material";

const StyledAppBar = styled(AppBar)(({ theme, backgroundColor }) => ({
  backgroundColor: backgroundColor || theme.palette.background.paper,
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  margin: 0,
  transition: "background-color 0.3s ease-in-out",
}));

const Header = () => {
  const [drawerState, setDrawerState] = useState({ menu: false });
  // eslint-disable-next-line
  const [searchQuery, setSearchQuery] = useState("");

  const [searchResults, setSearchResults] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartList = useSelector((state) => state.cartList);
  const { cart } = cartList || {};
  const user = JSON.parse(localStorage.getItem("user"));
    
  useEffect(() => {
    if (user && user._id) {
      dispatch(GetAddToCart(user._id));
    }
  }, [dispatch, user?._id, cart?.totalItems]);
  
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(LoginData(user._id));
    localStorage.clear();
    handleProfileMenuClose();
    navigate("/login");
  };
  const [backgroundColor, setBackgroundColor] = useState(
    theme.palette.background.paper
  );
  const menuItems = [
    { label: "Home", to: "/" },
    { label: "Collection", to: "/collection" },
    { label: "Contact Us", to: "/contact" },
  ];

  const profileMenuItems = user
    ? [
        { label: "Profile", to: "/profile" },
        { label: "Logout", onClick: handleLogout },
      ]
    : [
        { label: "Register", to: "/register" },
        { label: "Login", to: "/login" },
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
      <ToastContainer position="top-center" />
      <IconButton
        onClick={toggleDrawer("menu", false)}
        sx={{ position: "absolute", top: "8px", right: "8px" }}
      >
        <CloseIcon />
      </IconButton>
      {menuItems.map((item, index) => (
        <Link
          key={index}
          to={item.to}
          style={{ textDecoration: "none" }}
          onClick={toggleDrawer("menu", false)}
        >
          <Typography
            sx={{
              py: 2,
              color: theme.palette.black.main,
              "&:hover": {
                color: theme.palette.secondary.main,
                transition: "all 0.5s ease-in",
              },
            }}
          >
            {item.label}
          </Typography>
        </Link>
      ))}
    </Box>
  );

  return (
    <>
      <TopHeader />
      <StyledAppBar
        backgroundColor={backgroundColor}
        sx={{
          py: 1,
          mx: {
            xs: 0,
          },
          position: "relative",
        }}
      >
        <Toolbar
          sx={{
            justifyContent: "space-between",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              flexWrap: "wrap",
              justifyContent: "space-between",
              flexDirection: "row",
              px: 2,
            }}
          >
            {/* Logo */}
            <Box sx={{ order: isSmallScreen ? "0" : "0" }}>
              <Link to="/" style={{ textDecoration: "none" }}>
                <Box
                  sx={{
                    width: "100px",
                  }}
                >
                  <img
                    src="https://i.postimg.cc/gcBKX5Zy/png-clipart-the-jewellery-channel-gemological-institute-of-america-jewelry-television-sapphire-jewel.png"
                    alt="logo"
                  />
                </Box>
              </Link>
            </Box>

            {/* Menu Icon for small screens */}
            <Box>
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
                }}
              >
                {menuItems.map((item, index) => (
                  <Link
                    key={index}
                    to={item.to}
                    style={{
                      textDecoration: "none",
                      marginRight: "16px",
                      color: theme.palette.primary.main,
                    }}
                  >
                    <Typography
                      key={index}
                      sx={{
                        color: theme.palette.black.main,
                        textDecoration: "none",
                        cursor: "pointer",
                        transition: "color 0.3s ease",
                        "&:hover": {
                          color: theme.palette.secondary.main,
                          borderBottom: `1px solid ${theme.palette.primary.main} `,
                          transition: "all 0.4s ease in",
                        },
                      }}
                    >
                      {item.label}
                    </Typography>
                  </Link>
                ))}
              </Box>
            )}

            {/* Search Box */}
            <Box
              sx={{
                order: isSmallScreen ? "3" : "0",
                position: "relative",
                width: isSmallScreen ? "100%" : "20%",
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
                    <div>
                      {option.images?.[0] ? (
                        <img
                          src={option.images[0].url}
                          alt={`Product 1`}
                          style={{
                            width: "40px",
                            height: "40px",
                            borderRadius: "8px",
                            margin: "auto",
                          }}
                        />
                      ) : (
                        <p>No image available</p>
                      )}
                    </div>
                    <Typography>{option.name}</Typography>
                  </Box>
                )}
              />
            </Box>

            {/* Icons for Cart, Wishlist, and Profile */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                order: isSmallScreen ? "2" : "0",
                marginLeft: isSmallScreen ? "auto" : 2,
              }}
            >
              <IconButton component={Link} to="/wishlist" color="inherit">
                <Badge color="secondary" badgeContent={4}>
                  <Favorite />
                </Badge>
              </IconButton>

              <IconButton component={Link} to="/cart" color="inherit">
                <Badge
                  badgeContent={cart?.totalItems || 0}
                  color="secondary"
                >
                  <ShoppingCart />
                </Badge>
              </IconButton>
              <IconButton
                color="inherit"
                onClick={handleProfileMenuOpen}
                sx={{ p: 1 }}
              >
                <AccountCircleIcon />
              </IconButton>

              {/* Profile Dropdown Menu */}
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleProfileMenuClose}
                sx={{ mt: 5 }}
              >
                {profileMenuItems.map((item, index) => (
                  <MenuItem
                    key={index}
                    onClick={() => {
                      handleProfileMenuClose();
                      if (item.onClick) {
                        item.onClick(); // Handle logout
                      } else {
                        navigate(item.to);
                      }
                    }}
                  >
                    {item.label}
                  </MenuItem>
                ))}
              </Menu>
            </Box>
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
