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
import { GetWishlist } from "../redux/actions/productActions";
import EmptyCart from "../assets/image/emptycart.png";
import { SecondaryButton } from "../Global/Button/MuiButton";
import { useNavigate } from "react-router-dom";

const Wishlist = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const wishlist= useSelector((state) => state.wishlist);
  const { loading, wish, error } = wishlist || {};
  const isMobile = useMediaQuery("(max-width:767px)");

  

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?._id;

  console.log(wish);
  

  useEffect(() => {
    if (userId) {
      dispatch(GetWishlist(userId));
    }
  }, [dispatch, userId]);

  return (
    <Container>
      <Box sx={{ m: 2 }}>
        {loading && <CircularProgress />}
        {error && <Typography color="error">{error}</Typography>}

        {wish?.items?.length > 0 ? (
          <>
            {isMobile ? (
              wish?.items?.map((item) => (
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
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {wish?.items?.map((item) => (
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
                          ₹{item.productId.price}
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
                Your wishlist is empty.
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

export default Wishlist;
