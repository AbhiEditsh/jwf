import React from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  TextField,
  Button,
  Divider,
  Container,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { styled } from "@mui/system";

// Dummy cart data
const cartItems = [
  {
    id: 1,
    name: "Product 1",
    image: "https://via.placeholder.com/150",
    price: 25.99,
    quantity: 2,
  },
  {
    id: 2,
    name: "Product 2",
    image: "https://via.placeholder.com/150",
    price: 35.99,
    quantity: 1,
  },
  {
    id: 3,
    name: "Product 3",
    image: "https://via.placeholder.com/150",
    price: 15.99,
    quantity: 3,
  },
];

// Styled components
const StyledCard = styled(Card)(({ theme }) => ({
  display: "flex",
  marginBottom: theme.spacing(2),
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
}));

const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
  width: 150,
  height: 150,
  objectFit: "cover",
  [theme.breakpoints.down("sm")]: {
    width: 100,
    height: 100,
  },
}));

const Cart = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  // Calculate subtotal
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Shipping fees
  const shippingFees = 5.99;

  // Total
  const total = subtotal + shippingFees;

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Your Cart
      </Typography>
      <Grid container spacing={4}>
        {/* Cart Items */}
        <Grid item xs={12} md={8}>
          {cartItems.map((item) => (
            <StyledCard key={item.id}>
              <StyledCardMedia image={item.image} alt={item.name} />
              <CardContent sx={{ flex: 1 }}>
                <Typography variant="h6">{item.name}</Typography>
                <Typography variant="body1" color="textSecondary">
                  ${item.price.toFixed(2)}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                  <TextField
                    type="number"
                    value={item.quantity}
                    size="small"
                    sx={{ width: 80, mr: 2 }}
                    inputProps={{ min: 1 }}
                  />
                  <IconButton color="error">
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </CardContent>
            </StyledCard>
          ))}
        </Grid>

        {/* Order Summary */}
        <Grid item xs={12} md={4}>
          <Card sx={{ boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)" }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Order Summary
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography variant="body1">Subtotal</Typography>
                  <Typography variant="body1">
                    ${subtotal.toFixed(2)}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography variant="body1">Shipping</Typography>
                  <Typography variant="body1">
                    ${shippingFees.toFixed(2)}
                  </Typography>
                </Box>
                <Divider sx={{ my: 2 }} />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 2,
                  }}
                >
                  <Typography variant="body1" fontWeight="bold">
                    Total
                  </Typography>
                  <Typography variant="body1" fontWeight="bold">
                    ${total.toFixed(2)}
                  </Typography>
                </Box>
                <Button
                  variant="contained"
                  fullWidth
                  size="large"
                  sx={{ mt: 2 }}
                  onClick={() => alert("Proceeding to checkout...")}
                >
                  Proceed to Checkout
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Cart;
