import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  IconButton,
  Box,
  useMediaQuery,
  Card,
  CardContent,
  TableHead,
  Grid,
  Divider,
} from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import { GetAddToCart } from "../redux/actions/productActions";
import EmptyCart from "../assets/image/emptycart.png";
import { SecondaryButton } from "../Global/Button/MuiButton";
import { useNavigate } from "react-router-dom";
import theme from "../theme/theme";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import { useAuth } from "../Context/authContext";
import { useCart } from "../Context/CartContext";

const Cart = () => {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const { cart, addProductToCart, removeProductFromCart } = useCart();
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width:767px)");
  const userId = user.user?._id;

  useEffect(() => {
    if (userId) {
      dispatch(GetAddToCart(userId));
    }
  }, [dispatch, userId]);

  const handleRemove = (productId) => {
    removeProductFromCart(productId, userId).then(() => {
      dispatch(GetAddToCart(userId));
    });
  };

  const handleIncrease = (productId, quantity) => {
    addProductToCart(userId, productId, quantity + 1).then(() => {
      dispatch(GetAddToCart(userId));
    });
  };

  const handleDecrease = (productId, quantity) => {
    if (quantity > 1) {
      addProductToCart(userId, productId, quantity - 1).then(() => {
        dispatch(GetAddToCart(userId));
      });
    } else {
      removeProductFromCart(productId, userId).then(() => {
        dispatch(GetAddToCart(userId));
      });
    }
  };

  return (
    <Container>
      <Box sx={{ m: 2 }}>
        <Grid container row spacing={3}>
          <Grid item xs={12} md={6} lg={9}>
            {cart.cart?.items?.length > 0 ? (
              <>
                {isMobile ? (
                  cart.cart.items.map((item) => (
                    <Card
                      key={item.productId._id}
                      sx={{
                        display: "flex",
                        mb: 2,
                        boxShadow: 2,
                        borderRadius: 2,
                        p: 1,
                      }}
                    >
                      <img
                        src={item.productId.ProductImage}
                        alt={item.productId.name}
                        style={{
                          height: "80px",
                          width: "80px",
                          borderRadius: "10px",
                          marginTop: "25px",
                        }}
                      />
                      <CardContent sx={{ flex: 1, p: 1 }}>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <Box>
                            <Typography variant="body1">
                              {item.productId.name}
                            </Typography>
                          </Box>
                          <Box>
                            <CancelOutlinedIcon
                              onClick={() => handleRemove(item.productId._id)}
                              sx={{
                                cursor: "pointer",
                                color: theme.palette.red.main,
                              }}
                            />
                          </Box>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <Box>
                            <span> Price: </span>
                          </Box>
                          <Box>₹{item.productId.price}</Box>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <Box>
                            <span> Quantity: </span>
                          </Box>
                          <Box>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                width: "100px",
                                padding: "5px",
                                borderRadius: "10px",
                                border: `2px solid ${theme.palette.darkGrey.main}`,
                                mt: 1,
                                backgroundColor: theme.palette.lightgrey.main,
                              }}
                            >
                              <Box>
                                <Remove
                                  sx={{ cursor: "pointer", fontSize: "16px" }}
                                  onClick={() =>
                                    handleDecrease(
                                      item.productId._id,
                                      item.quantity
                                    )
                                  }
                                />
                              </Box>
                              {item.quantity}
                              <Box>
                                <Add
                                  sx={{ cursor: "pointer", fontSize: "16px" }}
                                  onClick={() =>
                                    handleIncrease(
                                      item.productId._id,
                                      item.quantity
                                    )
                                  }
                                />
                              </Box>
                            </Box>
                          </Box>
                        </Box>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <TableContainer
                    component={Paper}
                    sx={{
                      overflowX: "auto",
                      borderRadius: 2,
                      boxShadow: 3,
                      maxWidth: "100%",
                    }}
                  >
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell></TableCell>
                          <TableCell></TableCell>
                          <TableCell>Product</TableCell>
                          <TableCell align="right">Price</TableCell>
                          <TableCell align="center" width="150">
                            Quantity
                          </TableCell>
                          <TableCell align="right">Total</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {cart.cart.items.map((item) => (
                          <TableRow key={item.productId._id}>
                            <TableCell align="center">
                              <HighlightOffOutlinedIcon
                                sx={{
                                  cursor: "pointer",
                                  fontSize: "16px",
                                  color: theme.palette.red.main,
                                }}
                                onClick={() => handleRemove(item.productId._id)}
                              />
                            </TableCell>
                            <TableCell>
                              <img
                                src={item.productId.ProductImage}
                                alt={item.productId.name}
                                style={{
                                  height: "80px",
                                  width: "80px",
                                  borderRadius: "10px",
                                }}
                              />
                            </TableCell>
                            <TableCell>
                              <Typography fontWeight="bold">
                                {item.productId.name}
                              </Typography>
                            </TableCell>
                            <TableCell align="right">
                              ₹{item.productId.price}
                            </TableCell>
                            <TableCell align="center" width="150">
                              <IconButton
                                onClick={() =>
                                  handleDecrease(
                                    item.productId._id,
                                    item.quantity
                                  )
                                }
                              >
                                <Remove />
                              </IconButton>
                              {item.quantity}
                              <IconButton
                                onClick={() =>
                                  handleIncrease(
                                    item.productId._id,
                                    item.quantity
                                  )
                                }
                              >
                                <Add />
                              </IconButton>
                            </TableCell>
                            <TableCell align="right">
                              ₹
                              {(item.productId.price * item.quantity).toFixed(
                                2
                              )}
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
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <Box sx={{ textAlign: "center" }}>
                  <img
                    src={EmptyCart}
                    alt="Empty Cart"
                    style={{
                      width: "100px",
                      height: "100px",
                      textAlign: "center",
                      margin: "auto",
                    }}
                  />
                  <Typography sx={{ fontSize: 20, fontWeight: 500, my: 1 }}>
                    Your cart is empty.
                  </Typography>
                  <SecondaryButton
                    text="START SHOPPING"
                    onClick={() => navigate("/collection")}
                  />
                </Box>
              </Box>
            )}
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <Box
              sx={{
                backgroundColor: theme.palette.lightgrey.main,
              }}
              p={2}
              borderRadius={2}
            >
              <Typography variant="h6" gutterBottom>
                Cart Total
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box>
                  <span> Sub Total: </span>
                </Box>
                <Box>₹{cart.totalPrice}</Box>
              </Box>

              <Divider sx={{ my: 1 }} />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box>
                  <b>Total: </b>
                </Box>
                <Box>₹{cart.totalPrice}</Box>
              </Box>
              <SecondaryButton
                text="PROCEED TO CHECKOUT"
                onClick={() => navigate("/checkout")}
                sx={{ mt: 2, width: "100%" }}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Cart;