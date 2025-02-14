import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Typography,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Box,
  useMediaQuery,
  Card,
  CardContent,
  TableHead,
} from "@mui/material";
import {
  addToCart,
  GetWishlist,
  removeWishlist,
} from "../redux/actions/productActions";
import EmptyCart from "../assets/image/emptycart.png";
import { DarkButton, SecondaryButton } from "../Global/Button/MuiButton";
import { useNavigate } from "react-router-dom";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import theme from "../theme/theme";

const Wishlist = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, wishlist } =useSelector((state) => state.wishlist) || {};
  const isMobile = useMediaQuery("(max-width:767px)");

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?._id;

  useEffect(() => {
    if (userId) {
      dispatch(GetWishlist(userId));
    }
  }, [dispatch, userId]);
  

  const handleAddToCart = (productId) => {
    if (!user) {
      alert("Please log in first");
      return;
    }
    dispatch(addToCart(user._id, productId, 1));
  };
  const handleRemove = async (productId) => {
    await dispatch(removeWishlist(userId, productId));
  };
  
  

  return (
    <Container>
      <Box sx={{ m: 2 }}>
        {loading && <CircularProgress />}

        {wishlist?.length > 0 ? (
          <>
            {isMobile ? (
              wishlist.map((item) => (
                <Card
                  key={item.productId}
                  sx={{
                    display: "flex",
                    mb: 2,
                    boxShadow: 2,
                    borderRadius: 2,
                    p: 1,
                  }}
                >
                  <HighlightOffOutlinedIcon
                    onClick={() => handleRemove(item.productId)}
                    sx={{
                      cursor: "pointer",
                      fontSize: "16px",
                      color: theme.palette.red.main,
                    }}
                  />
                  <img
                    src={item.ProductImage || EmptyCart}
                    alt={item.name || "No Image"}
                    style={{
                      height: "80px",
                      width: "80px",
                      borderRadius: "10px",
                      marginTop: "25px",
                    }}
                  />
                  <CardContent sx={{ flex: 1, p: 1 }}>
                    <Box
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <Typography variant="body1">
                        {item.name || "Unknown Product"}
                      </Typography>
                    </Box>
                    <Box
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <Typography variant="body2">Price:</Typography>
                      <Typography>
                        <Box sx={{
                          backgroundColor:theme.palette.lightgrey.main,
                          border:`1px solid ${theme.palette.darkGrey.main}`,
                          padding:"4px 3px",
                          borderRadius:'10px'
                        }}>₹{item.price || 0}</Box>
                      </Typography>
                    </Box>
                    <Box
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <Typography>{item.Available}</Typography>
                      <DarkButton
                        text="ADD TO CART"
                        onClick={() => handleAddToCart(item.productId)}
                      />
                    </Box>
                  </CardContent>
                </Card>
              ))
            ) : (
              <TableContainer
                component={Paper}
                sx={{ overflowX: "auto", borderRadius: 2, boxShadow: 3 }}
              >
                <Table
                  sx={{
                    minWidth: 550,
                  }}
                >
                  <TableBody>
                    {wishlist.map((item) => (
                      <TableRow key={item.productId}>
                        <TableCell align="center">
                          <HighlightOffOutlinedIcon
                            onClick={() => handleRemove(item.productId)}
                            sx={{
                              cursor: "pointer",
                              fontSize: "20px",
                              color: theme.palette.red.main,
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <img
                            src={item.ProductImage || EmptyCart}
                            alt={item.name || "No Image"}
                            style={{
                              height: "80px",
                              width: "80px",
                              borderRadius: "10px",
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <Typography variant="body1">{item.name}</Typography>
                          <Typography variant="body1" gutterBottom>
                            {item.oldPrice && <span>&#8377; {item.price}</span>}
                            <span
                              style={{
                                textDecoration: item.oldPrice
                                  ? "line-through"
                                  : "none",
                                marginLeft: "10px",
                                color: theme.palette.grey.main,
                              }}
                            >
                              &#8377; {item.oldPrice}
                            </span>
                          </Typography>
                        </TableCell>
                        <TableCell align="right"></TableCell>
                        <TableCell align="center">
                          <Typography
                            sx={{
                              fontSize: "16px",
                              mb: 0,
                            }}
                          >
                            {item.Available ? "In stock" : "Out of stock"}
                          </Typography>
                          <DarkButton
                            text="ADD TO CART"
                            onClick={() => handleAddToCart(item.productId)}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </>
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              m: 2,
            }}
          >
            <img
              src={EmptyCart}
              alt="Empty Cart"
              style={{ width: "100px", height: "100px" }}
            />
            <Typography sx={{ fontSize: 20, fontWeight: 500, my: 1 }}>
              Your wishlist is empty.
            </Typography>
            <SecondaryButton
              text="START SHOPPING"
              onClick={() => navigate("/collection")}
            />
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default Wishlist;
