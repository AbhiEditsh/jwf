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

function Product() {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { products } = productList;
  const [sortKey, setSortKey] = useState("");
  const productUrl = `${window.location.origin}/product/${productId}`;
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedGenders, setSelectedGenders] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [view, setView] = useState("grid");
  const [page, setPage] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  const handleCategoryChange = (category) => {
    let updatedCategories = [...selectedCategories];
    if (updatedCategories.includes(category)) {
      updatedCategories = updatedCategories.filter((item) => item !== category);
    } else {
      updatedCategories.push(category);
    }
    setSelectedCategories(updatedCategories);
    filterProducts(updatedCategories, selectedGenders);
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

  const filterProducts = (categories, genders) => {
    const filtered = products.filter((product) => {
      const matchesCategory =
        categories.length === 0 ||
        categories.includes(product.category?.name || "Not available");
      const matchesGender =
        genders.length === 0 || genders.includes(product.gender);

      return matchesCategory && matchesGender;
    });
    setFilteredProducts(filtered);
  };

  const categories = [
    ...new Set(
      products.map((product) =>
        product.category ? product.category.name : "Not available"
      )
    ),
  ];
  const genders = [...new Set(products.map((product) => product.gender))];

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const itemsPerPage = 9;
  const paginatedProducts = filteredProducts.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const handleClearFilters = () => {
    setSelectedCategories([]);
    setSelectedGenders([]);
    setFilteredProducts(products);
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

  return (
    <div>
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer}
        sx={{ display: { xs: "block", sm: "block", md: "none" } }}
      >
        <Box width={250} padding={2} border={1}>
          <Box>
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
                  <input
                    type="checkbox"
                    id={category}
                    checked={selectedCategories.includes(category)}
                    onChange={() => handleCategoryChange(category)}
                  />
                  <label htmlFor={category}>{category}</label>
                </div>
              ))}
            </div>
            <Typography variant="h6">Gender</Typography>
            <div>
              {genders.map((gender) => (
                <div key={gender}>
                  <input
                    type="checkbox"
                    id={gender}
                    checked={selectedGenders.includes(gender)}
                    onChange={() => handleGenderChange(gender)}
                  />
                  <label htmlFor={gender}>{gender}</label>
                </div>
              ))}
            </div>
            <Box marginTop={2}>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleClearFilters}
                fullWidth
              >
                Clear Filters
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
                  Categories
                </Typography>
                <div>
                  {categories.map((category) => (
                    <div key={category}>
                      <input
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
                      <input
                        type="checkbox"
                        id={gender}
                        checked={selectedGenders.includes(gender)}
                        onChange={() => handleGenderChange(gender)}
                      />
                      <label htmlFor={gender}>{gender}</label>
                    </div>
                  ))}
                </div>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleClearFilters}
                  fullWidth
                  sx={{ marginTop: 2 }}
                >
                  Clear Filters
                </Button>
              </Box>
            </Grid>

            <Grid item xs={12} sm={9}>
              <Container>
                <Grid container spacing={3}>
                  {view === "grid" ? (
                    paginatedProducts.length > 0 ? (
                      paginatedProducts.map((product) => (
                        <Grid
                          item
                          xs={12}
                          sm={6}
                          md={4}
                          lg={4}
                          key={product.id}
                          data-aos="fade-in"
                          data-aos-duration="3000"
                        >
                          <Box
                            padding={2}
                            borderRadius={2}
                            sx={{
                              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                            }}
                          >
                            <div className="box_image">
                              <img
                                src={product.image}
                                alt={product.name}
                                width="80px"
                                height="200px"
                              />
                              <div className="hover_image">
                                <RemoveRedEyeIcon
                                  sx={{
                                    color: theme.palette.black.main,
                                    cursor: "pointer",
                                  }}
                                  onClick={() => handleOpenModal(product)}
                                />
                              </div>
                            </div>
                            <Link to={`/product/${product._id}`}>
                              <Typography
                                variant="h6"
                                sx={{
                                  color: theme.palette.primary.main,
                                  textAlign: "center",
                                }}
                              >
                                {product.name}
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
                                {product.description}
                              </Typography>
                            </Link>
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
                              {product.price}
                            </Typography>
                          </Box>
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
                              <Grid
                                item
                                xs={12}
                                sm={6}
                                md={6}
                                lg={3}
                                data-aos="fade-right"
                                data-aos-duration="2000"
                              >
                                <Box
                                  sx={{
                                    mb: 2,
                                  }}
                                >
                                  <div className="box_image">
                                    <img
                                      src={product.image}
                                      alt={product.name}
                                      width="150px"
                                      height="230px"
                                    />
                                    <div className="hover_image">
                                      <RemoveRedEyeIcon
                                        sx={{
                                          color: theme.palette.black.main,
                                          cursor: "pointer",
                                        }}
                                        onClick={() => handleOpenModal(product)}
                                      />
                                    </div>
                                  </div>
                                </Box>
                              </Grid>
                              <Grid
                                item
                                xs={12}
                                sm={6}
                                md={6}
                                lg={9}
                                data-aos="fade-left"
                                data-aos-duration="2000"
                              >
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
                                      justifyContent:{
                                        xs:'center',
                                        md:'flex-start'
                                      }
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
                                    >
                                      <WhatsappIcon size={25} round />
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
              <Pagination
                count={Math.ceil(filteredProducts.length / itemsPerPage)}
                page={page}
                onChange={handlePageChange}
                sx={{ display: "flex", justifyContent: "center", marginTop: 3 }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Modal */}
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
