import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import GridViewIcon from "@mui/icons-material/GridView";
import ListIcon from "@mui/icons-material/List";
import {
  Box,
  Typography,
  Grid,
  CircularProgress,
  Pagination,
  Container,
  Button,
  IconButton,
  MenuItem,
  FormControl,
  Alert,
  InputLabel,
  Select,
} from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { getProductsByCategory } from "../redux/actions/productActions";
import { Link, useParams } from "react-router-dom";
import ProductModel from "../Collection/ProductModel";
import theme from "../theme/theme";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";
import MuiCard from "../Global/Cart/MuiCard";
import male from "../../src/assets/image/male.png";
import female from "../../src/assets/image/female.png";

function CategoryPage() {
  const { productId, category } = useParams();
  const dispatch = useDispatch();
  const [selectedGenders, setSelectedGenders] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const productUrl = `${window.location.origin}/product/${productId}`;
  const [sortKey, setSortKey] = useState("");
  const [view, setView] = useState("grid");
  const [page, setPage] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const productsByCategory = useSelector((state) => state.productsByCategory);
  const { loading, products, error } = productsByCategory;

  useEffect(() => {
    dispatch(getProductsByCategory(category));
  }, [dispatch, category]);

  useEffect(() => {
    if (products) {
      setFilteredProducts(products);
    }
  }, [products]);

  const categories = [
    ...new Set(products.map((product) => product.category.name)),
  ];

  const handleGenderChange = (gender) => {
    let updatedGenders = [...selectedGenders];
    if (updatedGenders.includes(gender)) {
      updatedGenders = updatedGenders.filter((item) => item !== gender);
    } else {
      updatedGenders.push(gender);
    }
    setSelectedGenders(updatedGenders);
    filterProducts(updatedGenders);
  };

  const filterProducts = (genders) => {
    let filtered = products;
    if (genders.length > 0) {
      filtered = filtered.filter((product) => genders.includes(product.gender));
    }

    setFilteredProducts(filtered);
  };

  const handleOpenModal = (product) => {
    setSelectedProduct(products);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedProduct(null);
  };

  const genders = [...new Set(products.map((product) => product.gender))];

  const handleClearFilters = () => {
    setSelectedGenders([]);
    setFilteredProducts(products);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
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

  // Pagination
  const itemsPerPage = 9;
  const paginatedProducts = filteredProducts.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography variant="h6" color="error">
        {error}
      </Typography>
    );
  }

  return (
    <Box sx={{ py: 8 }}>
      <Container>
        <Typography
          variant="h6"
          color={theme.palette.primary.main}
          sx={{ py: 1 }}
        >
          {categories}
        </Typography>
        <Grid container spacing={3} sx={{}}>
          <Grid item xs={12} sm={4} md={3}>
            <Box
              sx={{
                padding: "16px",
                border: `1px solid ${theme.palette.lightgrey.main}`,
                borderRadius: "8px",
              }}
            >
              <Typography variant="h6" sx={{ marginBottom: 2 }}>
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
                    <label htmlFor={gender}>
                      <span>
                        {" "}
                        {gender === "male" ? (
                          <img
                            src={male}
                            style={{
                              width: "30px",
                              height: "30px",
                            }}
                            alt="male"
                          />
                        ) : gender === "female" ? (
                          <img
                            src={female}
                            style={{
                              width: "30px",
                              height: "30px",
                            }}
                            alt="female"
                          />
                        ) : (
                          <span>No gender specified</span>
                        )}
                      </span>

                      {gender}
                    </label>
                  </div>
                ))}
              </div>
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
          <Grid item xs={12} sm={8} md={9}>
            <Container>
              <Box
                display="flex"
                justifyContent="end"
                alignItems="center"
                flexWrap="wrap"
                gap={2}
                marginBottom={2}
              >
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
                      <MenuItem value="priceLowToHigh">
                        Price: Low to High
                      </MenuItem>
                      <MenuItem value="priceHighToLow">
                        Price: High to Low
                      </MenuItem>
                      <MenuItem value="nameAZ">Name: A to Z</MenuItem>
                      <MenuItem value="nameZA">Name: Z to A</MenuItem>
                    </Select>
                  </FormControl>
                  <IconButton onClick={() => setView("grid")}>
                    <GridViewIcon
                      color={view === "grid" ? "primary" : "inherit"}
                    />
                  </IconButton>
                  <IconButton onClick={() => setView("list")}>
                    <ListIcon color={view === "list" ? "primary" : "inherit"} />
                  </IconButton>
                </Box>
              </Box>
              <Grid container spacing={3} sx={{ pt: 4 }}>
                <Container>
                  <Grid container spacing={3}>
                    {view === "grid" ? (
                      paginatedProducts.length > 0 ? (
                        paginatedProducts.map((product) => (
                          <>
                            <Grid
                              item
                              xs={12}
                              sm={6}
                              md={4}
                              lg={4}
                              key={product.id}
                              data-aos="zoon-left"
                              data-aos-duration="2000"
                            >
                              <MuiCard product={product} />
                            </Grid>
                          </>
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
                                      <div>
                                        {product.ProductImage ? (
                                          <img
                                            src={product.ProductImage}
                                            alt={`Product 1`}
                                            style={{
                                              width: "200px",
                                              height: "200px",
                                              borderRadius: "8px",
                                              margin: "auto",
                                            }}
                                          />
                                        ) : (
                                          <p>No image available</p>
                                        )}
                                      </div>
                                      <div className="hover_image">
                                        <RemoveRedEyeIcon
                                          sx={{
                                            color: theme.palette.black.main,
                                            cursor: "pointer",
                                          }}
                                          onClick={() =>
                                            handleOpenModal(product)
                                          }
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
              </Grid>
            </Container>
          </Grid>
        </Grid>
      </Container>

      <Pagination
        count={Math.ceil(filteredProducts.length / itemsPerPage)}
        page={page}
        onChange={handlePageChange}
        sx={{ display: "flex", justifyContent: "center", marginTop: 3 }}
      />

      <ProductModel
        open={openModal}
        onClose={handleCloseModal}
        product={selectedProduct}
      />
    </Box>
  );
}

export default CategoryPage;
