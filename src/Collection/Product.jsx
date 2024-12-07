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
} from "@mui/material";
import GridViewIcon from "@mui/icons-material/GridView";
import ListIcon from "@mui/icons-material/List";
import FilterListIcon from "@mui/icons-material/FilterList";
import { Link } from "react-router-dom"; // Import Link for navigation
import theme from "../theme/theme";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../redux/actions/productActions";

function Product() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { products } = productList;

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedGenders, setSelectedGenders] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [view, setView] = useState("grid");
  const [page, setPage] = useState(1);

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
        categories.length === 0 || categories.includes(product.category);
      const matchesGender =
        genders.length === 0 || genders.includes(product.gender);
      return matchesCategory && matchesGender;
    });
    setFilteredProducts(filtered);
  };

  const categories = [...new Set(products.map((product) => product.category))];
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

  return (
    <div>
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer}
        sx={{ display: { xs: "block", sm: "none" } }}
      >
        <Box width={250} padding={2}>
          <Typography variant="h6">Categories</Typography>
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
          <Box display="flex" justifyContent="space-between" marginBottom={2}>
            <Box>
              <IconButton
                sx={{ display: { xs: "block", sm: "none" } }}
                onClick={toggleDrawer}
                color="primary"
              >
                <FilterListIcon />
              </IconButton>
            </Box>
            <Box>
              <IconButton onClick={() => setView("grid")}>
                <GridViewIcon color={view === "grid" ? "primary" : "inherit"} />
              </IconButton>
              <IconButton onClick={() => setView("list")}>
                <ListIcon color={view === "list" ? "primary" : "inherit"} />
              </IconButton>
            </Box>
          </Box>

          <Grid container spacing={3}>
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
                        >
                          <Box
                            padding={2}
                            borderRadius={2}
                            sx={{
                              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                            }}
                          >
                            <Link to={`/product/${product._id}`}>
                              <div className="box_image">
                                <img
                                  src={product.image}
                                  alt={product.name}
                                  width="100px"
                                  height="200px"
                                />
                              </div>
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
                                }}
                              >
                                RS.{product.price}
                              </Typography>
                              <Box
                                display="flex"
                                alignItems="center"
                                gap={1}
                                justifyContent={"space-between"}
                              >
                                <Typography
                                  variant="body2"
                                  color="textSecondary"
                                >
                                  {product.category}
                                </Typography>
                                <Typography variant="h6" color="textSecondary">
                                  {product.gender === "Male" ? "🧍🏻" : "🧍‍♀️"}
                                </Typography>
                              </Box>
                            </Link>
                          </Box>
                        </Grid>
                      ))
                    ) : (
                      <Typography variant="body1">
                        No products available for selected categories and
                        genders
                      </Typography>
                    )
                  ) : (
                    <Box>
                      {paginatedProducts.length > 0 ? (
                        paginatedProducts.map((product) => (
                          <Box key={product._id}>
                            <Link
                              to={`/product/${product._id}`}
                              style={{ width: "100%" }}
                            >
                              <Grid spacing={2} row container>
                                <Grid item xs={12} md={6} lg={3}>
                                  <Box
                                    sx={{
                                      boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                                      mb: 2,
                                    }}
                                  >
                                    <div className="box_image">
                                      <img
                                        src={product.image}
                                        alt={product.name}
                                        width="100px"
                                        height="200px"
                                      />
                                    </div>
                                  </Box>
                                </Grid>
                                <Grid item xs={12} md={6} lg={9}>
                                  <Typography
                                    variant="h6"
                                    sx={{
                                      color: theme.palette.primary.main,
                                      textAlign: "left",
                                    }}
                                  >
                                    {product.name}
                                  </Typography>
                                  <Typography
                                    sx={{ color: theme.palette.grey.main }}
                                  >
                                    {product.description}
                                  </Typography>

                                  <Box
                                    display="flex"
                                    alignItems="center"
                                    gap={1}
                                  >
                                    <Typography
                                      variant="body2"
                                      color="textSecondary"
                                    >
                                      {product.category}
                                    </Typography>
                                    <Typography
                                      variant="h6"
                                      color="textSecondary"
                                    >
                                      {product.gender === "Male" ? "🧍🏻" : "🧍‍♀️"}
                                    </Typography>
                                  </Box>
                                  <Typography
                                    sx={{
                                      color: theme.palette.grey.main,
                                      textAlign: "left",
                                      py: 1,
                                    }}
                                  >
                                    RS.{product.price}
                                  </Typography>
                                </Grid>
                              </Grid>
                            </Link>
                          </Box>
                        ))
                      ) : (
                        <Typography variant="body1">
                          No products available for selected categories and
                          genders
                        </Typography>
                      )}
                    </Box>
                  )}
                </Grid>
              </Container>
            </Grid>
          </Grid>

          <Box display="flex" justifyContent="center" marginTop={4}>
            <Pagination
              count={Math.ceil(filteredProducts.length / itemsPerPage)}
              page={page}
              onChange={handlePageChange}
              color="primary"
            />
          </Box>
        </Container>
      </Box>
    </div>
  );
}

export default Product;
