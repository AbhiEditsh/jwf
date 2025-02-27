import React, { useEffect, useState } from "react";
import {
  Grid,
  Typography,
  Box,
  Container,
  Drawer,
  IconButton,
  Pagination,
  Button,
  Alert,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Checkbox,
  Slider,
  Tooltip,
  CircularProgress,
} from "@mui/material";
import GridViewIcon from "@mui/icons-material/GridView";
import ListIcon from "@mui/icons-material/List";
import FilterListIcon from "@mui/icons-material/FilterList";
import { Link, useParams } from "react-router-dom"; // Import Link for navigation
import theme from "../theme/theme";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../redux/actions/productActions";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import ProductModel from "./ProductModel";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import MuiCard from "../Global/Cart/MuiCard";
import { useAuth } from "../Context/authContext";
import { useCart } from "../Context/CartContext";
import MuiModal from "../Global/Modal/MuiModal";
import { showToast } from "../Global/Message/MuiMessage";

function Product() {
  const { user } = useAuth();
  const userId = user ? user.user._id : null;
  const {
    addProductToCart,
    removeProductFromWishlist,
    addProductToWishlist,
    wishlist,
  } = useCart();
  const { productId } = useParams();
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { products } = productList;
  const [sortKey, setSortKey] = useState("");
  const productUrl = `${window.location.origin}/product/${productId}`;
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedGenders, setSelectedGenders] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [view, setView] = useState("grid");
  const [page, setPage] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [instock, setInStock] = useState([]);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [load, setLoad] = useState(false);
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  useEffect(() => {
    filterProducts(selectedCategories, selectedGenders, priceRange, instock);
  }, [selectedCategories, selectedGenders, priceRange, instock]);

  useEffect(() => {
    if (wishlist?.wishlist?.items && products) {
      const demo = wishlist.wishlist.items.some(
        (item) => item.productId === products._id && item.liked
      );
      setIsWishlisted(demo);
    }
  }, [wishlist.wishlist, products]);
  //FILTER
  const handleCategoryChange = (category) => {
    let updatedCategories = [...selectedCategories];
    if (updatedCategories.includes(category)) {
      updatedCategories = updatedCategories.filter((item) => item !== category);
    } else {
      updatedCategories.push(category);
    }
    setSelectedCategories(updatedCategories);
    filterProducts(updatedCategories, selectedGenders, instock);
  };
  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };
  const handleGenderChange = (gender) => {
    let updatedGenders = [...selectedGenders];
    if (updatedGenders.includes(gender)) {
      updatedGenders = updatedGenders.filter((item) => item !== gender);
    } else {
      updatedGenders.push(gender);
    }
    setSelectedGenders(updatedGenders);
    filterProducts(selectedCategories, updatedGenders);
  };
  const handleStockChange = (available) => {
    setInStock((prevStock) => {
      const updatedStock = prevStock.includes(available)
        ? prevStock.filter((item) => item !== available)
        : [...prevStock, available];

      return updatedStock;
    });
  };
  const filterProducts = () => {
    let filtered = [...products];
  
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((product) =>
        selectedCategories.includes(product.category?.name || "Not available")
      );
    }
  
    if (selectedGenders.length > 0) {
      filtered = filtered.filter((product) =>
        selectedGenders.includes(product.gender)
      );
    }
  
    filtered = filtered.filter(
      (product) => product.price >= priceRange[0] && product.price <= priceRange[1]
    );
  
    if (instock.length > 0) {
      filtered = filtered.filter((product) => instock.includes(product.Available));
    }
  
    if (sortKey) {
      filtered.sort((a, b) => {
        switch (sortKey) {
          case "priceLowToHigh":
            return a.price - b.price;
          case "priceHighToLow":
            return b.price - a.price;
          case "nameAZ":
            return a.name.localeCompare(b.name);
          case "nameZA":
            return b.name.localeCompare(a.name);
          default:
            return 0;
        }
      });
    }
  
    setFilteredProducts(filtered);
    setPage(1);
  };

  const categories = [
    ...new Set(
      products.map((product) =>
        product.category ? product.category.name : "Not available"
      )
    ),
  ];
  const genders = [...new Set(products.map((product) => product.gender))];
  const Available = [...new Set(products.map((product) => product.Available))];

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const itemsPerPage = 9;
  const paginatedProducts = filteredProducts.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleClearFilters = () => {
    setSelectedCategories([]);
    setSelectedGenders([]);
    setInStock([]);
    setFilteredProducts(products);
    setPage(1);
  };
  const handleOpenModal = (product) => {
    setSelectedProduct(product);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedProduct(null);
  };

  const handleSort = (key) => {
    const sorted = [...filteredProducts].sort((a, b) => {
      if (key === "priceLowToHigh") return a.price - b.price;
      if (key === "priceHighToLow") return b.price - a.price;
      if (key === "nameAZ") return a.name.localeCompare(b.name);
      if (key === "nameZA") return b.name.localeCompare(a.name);
      return 0;
    });
    setSortKey(key);
    setFilteredProducts(sorted);
  };
  //ADD TO CART
  const handleAddToCart = (productId) => {
    if (!userId) {
      setOpenModal(true);
      return;
    }
    addProductToCart(userId, productId, 1);
    showToast.success("Added to Cart");
  };
  //WISHLIST
  const handleAddToWishlist = async (productId) => {
    if (!userId) return setOpenModal(true);

    setLoad(true);
    try {
      if (isWishlisted) {
        await removeProductFromWishlist(userId, productId);
        showToast.success("Removed from Wishlist");
      } else {
        await addProductToWishlist(userId, productId);
        showToast.success("Added to Wishlist");
      }

      setIsWishlisted(!isWishlisted);
    } catch (error) {
      console.error("Error handling wishlist toggle:", error.message);
      showToast.error("Failed to update Wishlist");
    } finally {
      setLoad(false);
    }
  };
  return (
    <div>
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer}
        sx={{ display: { xs: "block", sm: "block", md: "none" } }}
      >
        <Box width={250} padding={2}>
          <Box>
            <Typography
              variant="h6"
              sx={{
                border: `1px solid ${theme.palette.lightgrey.main}`,
                borderRadius: "4",
                p: 1,
                my: 2,
              }}
            >
              Price
            </Typography>
            <Slider
              value={priceRange}
              aria-label="Always visible"
              onChange={handlePriceChange}
              step={10}
              min={0}
              max={1000}
              valueLabelDisplay="on"
            />
            <Typography
              variant="h6"
              sx={{
                color: theme.palette.primary.main,
              }}
            >
              Categories
            </Typography>
            <div>
              {categories.map((category) => (
                <div key={category}>
                  <Checkbox
                    id={category}
                    checked={selectedCategories.includes(category)}
                    onChange={() => handleCategoryChange(category)}
                  />
                  <label htmlFor={category}>{category}</label>
                </div>
              ))}
            </div>
            <Typography
              variant="h6"
              sx={{
                border: `1px solid ${theme.palette.lightgrey.main}`,
                borderRadius: "4",
                p: 1,
                my: 2,
              }}
            >
              Gender
            </Typography>
            <div>
              {genders.map((gender) => (
                <div key={gender}>
                  <Checkbox
                    id={gender}
                    checked={selectedGenders.includes(gender)}
                    onChange={() => handleGenderChange(gender)}
                  />
                  <label htmlFor={gender}>{gender}</label>
                </div>
              ))}
            </div>
            <Typography
              variant="h6"
              sx={{
                border: `1px solid ${theme.palette.lightgrey.main}`,
                borderRadius: "4",
                p: 1,
                my: 2,
              }}
            >
              Availability
            </Typography>
            {Available.map((available) => (
              <div key={available}>
                <Checkbox
                  type="checkbox"
                  id={available}
                  checked={instock.includes(available)}
                  onChange={() => handleStockChange(available)}
                />
                <label htmlFor={available}>{available}</label>
              </div>
            ))}
            <Box marginTop={2}>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleClearFilters}
                fullWidth
              >
                Clear
              </Button>
            </Box>
          </Box>
        </Box>
      </Drawer>

      <Box
        sx={{
          py: {
            xs: 2,
            sm: 4,
            md: 8,
          },
        }}
      >
        <Container>
          <Box
            display="flex"
            justifyContent="end"
            alignItems="center"
            flexWrap="wrap"
            gap={2}
            marginBottom={2}
          >
            {/* Filter Button for Mobile */}
            <IconButton
              sx={{
                display: { xs: "flex", sm: "none" },
              }}
              onClick={toggleDrawer}
              color="primary"
            >
              <FilterListIcon />
            </IconButton>

            {/* View Icons */}
            <Box display="flex" gap={1}>
              {/* Sort Dropdown */}
              <FormControl
                size="small"
                variant="standard"
                sx={{ minWidth: 150 }}
              >
                <InputLabel id="sort-select-label">Sort By</InputLabel>
                <Select
                  labelId="sort-select-label"
                  label="Sort By"
                  id="sort-simple-select"
                  value={sortKey}
                  onChange={(e) => handleSort(e.target.value)}
                  displayEmpty
                >
                  <MenuItem value="defauksorting" selected disabled>
                    Default Sorting
                  </MenuItem>
                  <MenuItem value="priceLowToHigh">Price: Low to High</MenuItem>
                  <MenuItem value="priceHighToLow">Price: High to Low</MenuItem>
                  <MenuItem value="nameAZ">Name: A to Z</MenuItem>
                  <MenuItem value="nameZA">Name: Z to A</MenuItem>
                </Select>
              </FormControl>
              <IconButton onClick={() => setView("grid")}>
                <GridViewIcon color={view === "grid" ? "primary" : "inherit"} />
              </IconButton>
              <IconButton onClick={() => setView("list")}>
                <ListIcon color={view === "list" ? "primary" : "inherit"} />
              </IconButton>
            </Box>
          </Box>

          <Grid container spacing={3} sx={{ py: { xs: 2, md: 4 } }}>
            <Grid
              item
              xs={12}
              sm={3}
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              <Box padding={2}>
                <Typography
                  variant="h6"
                  sx={{
                    border: `1px solid ${theme.palette.lightgrey.main}`,
                    borderRadius: "10",
                    p: 1,
                    my: 2,
                  }}
                >
                  Price
                </Typography>
                <Box
                  sx={{
                    pt: 4,
                  }}
                >
                  <Slider
                    value={priceRange}
                    aria-label="Always visible"
                    onChange={handlePriceChange}
                    step={10}
                    min={0}
                    max={1000}
                    valueLabelDisplay="on"
                    sx={{
                      "& .MuiSlider-valueLabel": {
                        backgroundColor: theme.palette.primary.main,
                        color: theme.palette.white.main,
                        fontSize: "10px",
                      },
                      fontSize: "14px",
                    }}
                  />
                </Box>
                <Typography
                  variant="h6"
                  sx={{
                    border: `1px solid ${theme.palette.lightgrey.main}`,
                    borderRadius: "10",
                    p: 1,
                    my: 2,
                  }}
                >
                  Categories
                </Typography>
                <div>
                  {categories.map((category) => (
                    <div key={category}>
                      <Checkbox
                        type="checkbox"
                        id={category}
                        checked={selectedCategories.includes(category)}
                        onChange={() => handleCategoryChange(category)}
                      />
                      <label htmlFor={category}>{category}</label>
                    </div>
                  ))}
                </div>
                <Typography
                  variant="h6"
                  sx={{
                    border: `1px solid ${theme.palette.lightgrey.main}`,
                    borderRadius: "4",
                    p: 1,
                    my: 2,
                  }}
                >
                  Gender
                </Typography>
                <div>
                  {genders.map((gender) => (
                    <div key={gender}>
                      <Checkbox
                        type="checkbox"
                        id={gender}
                        checked={selectedGenders.includes(gender)}
                        onChange={() => handleGenderChange(gender)}
                      />
                      <label htmlFor={gender}>{gender}</label>
                    </div>
                  ))}
                </div>
                <Typography
                  variant="h6"
                  sx={{
                    border: `1px solid ${theme.palette.lightgrey.main}`,
                    borderRadius: "4",
                    p: 1,
                    my: 2,
                  }}
                >
                  Availability
                </Typography>
                {Available.map((available) => (
                  <div key={available}>
                    <Checkbox
                      type="checkbox"
                      id={available}
                      checked={instock.includes(available)}
                      onChange={() => handleStockChange(available)}
                    />
                    <label htmlFor={available}>{available}</label>
                  </div>
                ))}

                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleClearFilters}
                  fullWidth
                  sx={{ marginTop: 2, color: theme.palette.white.main }}
                >
                  Clear
                </Button>
              </Box>
            </Grid>

            <Grid item xs={12} sm={9}>
              <Container>
                <Grid
                  container
                  spacing={3}
                  sx={{
                    justifyContent: "center",
                    width: "100%",
                    marginLeft: 0,
                  }}
                >
                  {view === "grid" ? (
                    paginatedProducts.length > 0 ? (
                      paginatedProducts.map((product) => (
                        <Grid
                          item
                          xs={12}
                          sm={6}
                          md={6}
                          lg={4}
                          key={product.id}
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            paddingLeft: 0,
                          }}
                        >
                          <MuiCard product={product} />
                        </Grid>
                      ))
                    ) : (
                      <Grid item xs={12}>
                        <Alert severity="error" fullWidth>
                          No products available !
                        </Alert>
                      </Grid>
                    )
                  ) : (
                    <Box>
                      {paginatedProducts.length > 0 ? (
                        paginatedProducts.map((product) => (
                          <Box key={product._id}>
                            <Grid spacing={2} row container>
                              <Grid item xs={12} sm={6} md={6} lg={4}>
                                <Box
                                  sx={{
                                    mb: 2,
                                    display: "flex",
                                    justifyContent: "center",
                                  }}
                                >
                                  <div className="box_image">
                                    <Box>
                                      {product.ProductImage ? (
                                        <img
                                          src={product.ProductImage}
                                          alt={`Product 1`}
                                          style={{
                                            width: "220px",
                                            height: "250px",
                                            borderRadius: "25px",
                                            margin: "auto",
                                          }}
                                        />
                                      ) : (
                                        <p>No image available</p>
                                      )}
                                      <div className="hover_image">
                                        <Box>
                                          <Box sx={{ py: 0.5 }}>
                                            <Tooltip title="Quick View" arrow>
                                              <IconButton
                                                onClick={() =>
                                                  handleOpenModal(product)
                                                }
                                                aria-label="Quick View"
                                                sx={{
                                                  padding: 0,
                                                }}
                                              >
                                                <RemoveRedEyeIcon
                                                  sx={{
                                                    color:
                                                      theme.palette.white.main,
                                                    border: `1px solid ${theme.palette.white.main}`,
                                                    borderRadius: "50%",
                                                    padding: "2px",
                                                    fontSize: "30px",
                                                    marginLeft: "6px",
                                                  }}
                                                />
                                              </IconButton>
                                            </Tooltip>
                                          </Box>
                                          <Box sx={{ py: 0.5 }}>
                                            <Tooltip
                                              title="Add to shopping cart"
                                              arrow
                                            >
                                              <IconButton
                                                color="secondary"
                                                onClick={() =>
                                                  handleAddToCart(product._id)
                                                }
                                                aria-label="Add to Cart"
                                                sx={{
                                                  padding: 0,
                                                }}
                                              >
                                                <ShoppingBasketIcon
                                                  sx={{
                                                    color:
                                                      theme.palette.white.main,
                                                    border: `1px solid ${theme.palette.white.main}`,
                                                    borderRadius: "50%",
                                                    padding: "2px",
                                                    fontSize: "30px",
                                                    marginLeft: "6px",
                                                  }}
                                                />
                                              </IconButton>
                                            </Tooltip>
                                          </Box>
                                          <Box sx={{ py: 0.5 }}>
                                            <Tooltip
                                              title="Add to wishlist"
                                              arrow
                                            >
                                              <IconButton
                                                color="secondary"
                                                onClick={() =>
                                                  handleAddToWishlist(
                                                    product._id
                                                  )
                                                }
                                                aria-label="Add to wishlist"
                                              >
                                                {load ? (
                                                  <CircularProgress
                                                    size={24}
                                                    sx={{ color: "white" }}
                                                  />
                                                ) : isWishlisted ? (
                                                  <FavoriteIcon
                                                    sx={{
                                                      color: "#ff0000",
                                                      border: `1px solid ${theme.palette.white.main}`,
                                                      borderRadius: "50%",
                                                      padding: "6px",
                                                      fontSize: "30px",
                                                      marginLeft: "2px",
                                                    }}
                                                  />
                                                ) : (
                                                  <FavoriteBorderIcon
                                                    sx={{
                                                      color: "#ddd",
                                                      border: `1px solid ${theme.palette.white.main}`,
                                                      padding: "6px",
                                                      borderRadius: "50%",
                                                      fontSize: "30px",
                                                      marginLeft: "2px",
                                                    }}
                                                  />
                                                )}
                                              </IconButton>
                                            </Tooltip>
                                          </Box>
                                        </Box>
                                      </div>
                                    </Box>
                                  </div>
                                </Box>
                              </Grid>
                              <Grid item xs={12} sm={6} md={6} lg={8}>
                                <Link
                                  to={`/product/${product._id}`}
                                  style={{ width: "100%" }}
                                >
                                  <Typography
                                    variant="h6"
                                    sx={{
                                      color: theme.palette.primary.main,
                                      textAlign: {
                                        xs: "center",
                                        md: "left",
                                      },
                                    }}
                                  >
                                    {product.name}
                                  </Typography>
                                  <Typography
                                    sx={{
                                      color: theme.palette.grey.main,
                                      fontSize: "14px",
                                      py: 1,
                                      textAlign: {
                                        xs: "center",
                                        md: "left",
                                      },
                                    }}
                                  >
                                    {product.description}
                                  </Typography>
                                  <Typography
                                    sx={{
                                      color: theme.palette.grey.main,
                                      fontSize: "14px",
                                      textAlign: {
                                        xs: "center",
                                        md: "left",
                                      },
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
                                    {product.price}
                                  </Typography>
                                </Link>
                                <Box sx={{ my: 2 }}>
                                  <Box
                                    sx={{
                                      display: "flex",
                                      gap: 2,
                                      alignItems: "center",
                                      justifyContent: {
                                        xs: "center",
                                        md: "flex-start",
                                      },
                                    }}
                                  >
                                    <FacebookShareButton
                                      url={productUrl}
                                      quote={product.name}
                                    >
                                      <FacebookIcon size={25} round />
                                    </FacebookShareButton>
                                    <TwitterShareButton
                                      url={productUrl}
                                      title={`Check out this product: ${product.name}`}
                                    >
                                      <TwitterIcon size={25} round />
                                    </TwitterShareButton>
                                    <WhatsappShareButton
                                      url={productUrl}
                                      title={`Check out this product: ${product.name}`}
                                      media={product?.images?.[0]?.url}
                                    >
                                      <WhatsappIcon size={20} round />
                                    </WhatsappShareButton>
                                  </Box>
                                </Box>
                              </Grid>
                            </Grid>
                          </Box>
                        ))
                      ) : (
                        <Alert severity="error" fullwidth>
                          No products available !
                        </Alert>
                      )}
                    </Box>
                  )}
                </Grid>
              </Container>
              <Box
                sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}
              >
                <Pagination
                  count={Math.ceil(filteredProducts.length / itemsPerPage)}
                  page={page}
                  onChange={handlePageChange}
                  sx={{
                    color: theme.palette.primary.main,
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
      {/*  LOGIN MODAL  */}
      <MuiModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        message="Please log in First🔐"
        onConfirm={() => setOpenModal(false)}
      />

      {/* QUICK VIEW MODAL */}
      {openModal && selectedProduct && (
        <ProductModel
          product={selectedProduct}
          open={openModal}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}

export default Product;
