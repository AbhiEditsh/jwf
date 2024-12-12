import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Typography,
  Grid,
  CircularProgress,
  Container,
  Button,
} from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { getProductsByCategory } from "../redux/actions/productActions";
import { Link, useParams } from "react-router-dom";
import ProductModel from "../Collection/ProductModel";
import theme from "../theme/theme";

function CategoryPage() {
  const { categoryId } = useParams();
  const dispatch = useDispatch();
  const [selectedGenders, setSelectedGenders] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [openModal, setOpenModal] = useState(false); // Modal state
  const [selectedProduct, setSelectedProduct] = useState(null); // Selected product
  const productsByCategory = useSelector((state) => state.productsByCategory);
  const { loading, products, error } = productsByCategory;

  useEffect(() => {
    dispatch(getProductsByCategory(categoryId));
  }, [dispatch, categoryId]);

  useEffect(() => {
    if (products) {
      setFilteredProducts(products);
    }
  }, [products]);

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
    setSelectedProduct(product);
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
        <Grid container spacing={3}>
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
          <Grid item xs={12} sm={8} md={9}>
            <Container>
              <Grid container spacing={3}>
                {filteredProducts.map((product) => (
                  <Grid item xs={12} sm={6} md={4} key={product._id}>
                    <Box
                      sx={{
                        border: "1px solid #ddd",
                        borderRadius: "8px",
                        padding: "16px",
                        textAlign: "center",
                      }}
                    >
                      <div className="box_image">
                        <img
                          src={product.image}
                          alt={product.name}
                          width="100px"
                          height="200px"
                        />
                        <div
                          className="hover_image"
                          onClick={() => handleOpenModal(product)}
                        >
                          <RemoveRedEyeIcon
                            sx={{
                              color: theme.palette.black.main,
                              cursor: "pointer",
                            }}
                          />
                        </div>
                      </div>
                      <Link to={`/product/${product._id}`}>
                        <Typography
                          variant="h6"
                          sx={{
                            color: theme.palette.primary.main,
                          }}
                        >
                          {product.name}
                        </Typography>
                        <Typography
                          sx={{
                            color: theme.palette.grey.main,
                          }}
                        >
                          RS.{product.price}
                        </Typography>
                      </Link>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Container>
          </Grid>
        </Grid>
      </Container>

      <ProductModel
        open={openModal}
        onClose={handleCloseModal}
        product={selectedProduct}
      />
    </Box>
  );
}

export default CategoryPage;
