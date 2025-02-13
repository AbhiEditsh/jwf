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
  IconButton,
  Box,
  useMediaQuery,
  Card,
  CardContent,
  TableHead,
} from "@mui/material";
import { Add, Remove, Delete } from "@mui/icons-material";
import {
  GetAddToCart,
  removeFromCart,
  addToCart,
} from "../redux/actions/productActions";
import EmptyCart from "../assets/image/emptycart.png";
import { SecondaryButton } from "../Global/Button/MuiButton";
import { useNavigate } from "react-router-dom";
import theme from "../theme/theme";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartList = useSelector((state) => state.cartList);
  const { loading, cart, error } = cartList.cart || {};
  const isMobile = useMediaQuery("(max-width:767px)");

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?._id;

  useEffect(() => {
    if (userId) {
      dispatch(GetAddToCart(userId));
    }
  }, [dispatch, userId]);

  const handleRemove = (productId) => {
    dispatch(removeFromCart(productId, userId)).then(() => {
      dispatch(GetAddToCart(userId));
    });
  };

  const handleIncrease = (productId, quantity) => {
    dispatch(addToCart(userId, productId, quantity + 1)).then(() => {
      dispatch(GetAddToCart(userId));
    });
  };

  const handleDecrease = (productId, quantity) => {
    if (quantity > 1) {
      dispatch(addToCart(userId, productId, quantity - 1)).then(() => {
        dispatch(GetAddToCart(userId));
      });
    } else {
      dispatch(removeFromCart(productId, userId)).then(() => {
        dispatch(GetAddToCart(userId));
      });
    }
  };

  const calculateTotalPrice = () => {
    return (
      cart?.items?.reduce(
        (total, item) => total + item.productId.price * item.quantity,
        0
      ) || 0
    );
  };

  return (
    <Container>
      <Box sx={{ m: 2 }}>
        {loading && <CircularProgress />}
        {error && <Typography color="error">{error}</Typography>}

        {cart?.items?.length > 0 ? (
          <>
            {isMobile ? (
              cart.items.map((item) => (
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
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",

                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Box>
                        <span> Sub total: </span>
                      </Box>
                      <Box>₹{calculateTotalPrice().toFixed(2)}</Box>
                    </Box>

                    <Typography variant="body2"></Typography>
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
                      <TableCell>Product</TableCell>
                      <TableCell align="right">Price</TableCell>
                      <TableCell align="right">Quantity</TableCell>
                      <TableCell align="right">Total</TableCell>
                      <TableCell align="center">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {cart.items.map((item) => (
                      <TableRow key={item.productId._id}>
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
                          ${item.productId.price}
                        </TableCell>
                        <TableCell align="right">
                          <IconButton
                            onClick={() =>
                              handleDecrease(item.productId._id, item.quantity)
                            }
                          >
                            <Remove />
                          </IconButton>
                          {item.quantity}
                          <IconButton
                            onClick={() =>
                              handleIncrease(item.productId._id, item.quantity)
                            }
                          >
                            <Add />
                          </IconButton>
                        </TableCell>
                        <TableCell align="right">
                          ${(item.productId.price * item.quantity).toFixed(2)}
                        </TableCell>
                        <TableCell align="center">
                          <IconButton
                            color="error"
                            onClick={() => handleRemove(item.productId._id)}
                          >
                            <Delete />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
            <Box
              sx={{
                backgroundColor: theme.palette.lightgrey.main,
              }}
              mt={4}
              p={2}
              borderRadius={2}
            >
              <Typography variant="h6" gutterBottom>Order Summary</Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box>
                  <span> Total: </span>
                </Box>
                <Box>₹{calculateTotalPrice().toFixed(2)}</Box>
              </Box>
            </Box>
          </>
        ) : (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              m: 2,
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
      </Box>
    </Container>
  );
};

export default Cart;
