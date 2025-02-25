import React from "react";
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
  Box,
  useMediaQuery,
  Card,
  CardContent,
} from "@mui/material";
import { GetWishlist } from "../redux/actions/productActions";
import EmptyCart from "../assets/image/emptycart.png";
import { DarkButton, SecondaryButton } from "../Global/Button/MuiButton";
import { useNavigate } from "react-router-dom";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import theme from "../theme/theme";
import { useAuth } from "../Context/authContext";
import { useCart } from "../Context/CartContext";

const Wishlist = () => {
  const { user } = useAuth();
  const { wishlist, removeProductFromWishlist, addProductToCart } = useCart();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width:767px)");
  const userId = user?.user?._id;

  const handleAddToCart = (productId) => {
    if (!user) {
      alert("Please log in first");
      return;
    }
    addProductToCart(userId, productId, 1);
  };

  const handleRemove = async (productId) => {
    await removeProductFromWishlist(userId, productId);
    if (wishlist?.wishlist?.items?.length > 1) {
      dispatch(GetWishlist(userId));
    } else {
      window.location.replace("/collection")
      dispatch({ type: "CLEAR_WISH_LIST" });
    }
  };
  
  return (
    <Container>
      <Box sx={{ m: 2 }}>
        {wishlist?.wishlist?.items?.length > 0 ? (
          isMobile ? (
            wishlist.wishlist.items.map((item) => (
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
                  <Typography variant="body1">
                    {item.name || "Unknown Product"}
                  </Typography>
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography variant="body2">Price:</Typography>
                    <Typography>
                      <Box
                        sx={{
                          backgroundColor: theme.palette.lightgrey.main,
                          border: `1px solid ${theme.palette.darkGrey.main}`,
                          padding: "4px 3px",
                          borderRadius: "10px",
                        }}
                      >
                        ₹{item.price || 0}
                      </Box>
                      {item.oldPrice && (
                        <span
                          style={{
                            textDecoration: "line-through",
                            marginLeft: "10px",
                            color: theme.palette.grey.main,
                          }}
                        >
                          ₹{item.oldPrice}
                        </span>
                      )}
                    </Typography>
                  </Box>
                  <DarkButton
                    text="ADD TO CART"
                    onClick={() => handleAddToCart(item.productId)}
                  />
                </CardContent>
              </Card>
            ))
          ) : (
            <TableContainer
              component={Paper}
              sx={{ overflowX: "auto", borderRadius: 2, boxShadow: 3 }}
            >
              <Table sx={{ minWidth: 550 }}>
                <TableBody>
                  {wishlist.wishlist.items.map((item) => (
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
                        {item.oldPrice && (
                          <Typography variant="body1" gutterBottom>
                            ₹{item.price}{" "}
                            <span
                              style={{
                                textDecoration: "line-through",
                                marginLeft: "10px",
                                color: theme.palette.grey.main,
                              }}
                            >
                              ₹{item.oldPrice}
                            </span>
                          </Typography>
                        )}
                      </TableCell>
                      <TableCell align="center">
                        <Typography sx={{ fontSize: "16px" }}>
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
          )
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
