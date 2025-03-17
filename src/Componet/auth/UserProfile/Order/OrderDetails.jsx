import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Grid,
  Box,
  TableRow,
  Table,
  TableHead,
  TableCell,
  TableBody,
  TableContainer,
  Paper,
  Card,
  CardContent,
} from "@mui/material";
import theme from "../../../../theme/theme";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const OrderDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state?.order;

<<<<<<< HEAD
=======
  console.log(order);
>>>>>>> Product-check

  return (
    <Container sx={{ mt: 4, mb: 4 }}>
      {order ? (
        <>
          <ArrowBackIcon
            onClick={() => navigate("/profile")}
            sx={{ cursor: "pointer", mb: 2 }}
          />
          <Typography variant="h6" sx={{ mb: 3 }}>
            Order was placed on {formatDate(order.createdAt)} and is currently
            <span
              style={{ color: theme.palette.primary.main, marginLeft: "10px" }}
            >
              {order.status}
            </span>
          </Typography>
          <TableContainer component={Paper} sx={{ mb: 3 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600 }}>Product</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Price</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Quantity</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Total</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {order.items.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 2 }}
                      >
                        <img
                          src={item.productDetails?.productImage}
                          alt={item.productDetails?.name}
                          style={{ height: 60, width: 60, borderRadius: 8 }}
                        />
                        <Typography>{item.productDetails?.name}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell>₹{item.productDetails?.price}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>
                      ₹{item.productDetails?.price * item.quantity}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Grid container spacing={2} sx={{ mb: 3 }} justifyContent={"end"}>
            <Grid item xs={12} sm={12}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Order Summary
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Typography>Subtotal: ₹{order.amount}</Typography>
                <Typography>Payment Method: {order.paymentMethod}</Typography>
                <Typography sx={{ fontWeight: 600, mt: 1 }}>
                  Total: ₹{order.amount}
                </Typography>
              </Box>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Card variant="outlined" sx={{ mb: 2 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Billing Address
                  </Typography>
                  <Typography>{`${order.billingAddress.firstName} ${order.billingAddress.lastName}`}</Typography>
                  <Typography>{order.billingAddress.phone}</Typography>
                  <Typography>{order.billingAddress.email}</Typography>
                  <Typography>{order.billingAddress.address}</Typography>
                  <Typography>{`${order.billingAddress.city}, ${order.billingAddress.state}, ${order.billingAddress.zipcode}`}</Typography>
                  <Typography>{order.billingAddress.country}</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Card variant="outlined" sx={{ mb: 2 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Shipping Address
                  </Typography>
                  <Typography>{`${order.shippingAddress.firstName} ${order.shippingAddress.lastName}`}</Typography>
                  <Typography>{order.shippingAddress.phone}</Typography>
                  <Typography>{order.shippingAddress.email}</Typography>
                  <Typography>{order.shippingAddress.address}</Typography>
                  <Typography>{`${order.shippingAddress.city}, ${order.shippingAddress.state}, ${order.shippingAddress.zipcode}`}</Typography>
                  <Typography>{order.shippingAddress.country}</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </>
      ) : (
        <Typography variant="h6" color="error">
          No order found
        </Typography>
      )}
    </Container>
  );
};

export default OrderDetails;
