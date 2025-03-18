import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Grid,
  TextField,
  Typography,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
  FormControl,
  Divider,
  Checkbox,
  Badge,
} from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useCart } from "../../../Context/CartContext";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCart,
  createOrder,
  getOrdersByUserId,
  processPayment,
  verifyPayment,
} from "../../../redux/actions/productActions";
import { useAuth } from "../../../Context/authContext";
import { useNavigate } from "react-router-dom";

const AddressSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  phone: Yup.string().required("Phone is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  zipcode: Yup.string().required("Zipcode is required"),
  country: Yup.string().required("Country is required"),
  state: Yup.string().required("State is required"),
  city: Yup.string().required("City is required"),
  address: Yup.string().required("Address is required"),
});

const CheckoutSchema = Yup.object().shape({
  billingAddress: AddressSchema,
  shippingAddress: AddressSchema,
  paymentMethod: Yup.string().required("Payment Method is required"),
});

const Checkout = () => {
  const { cart } = useCart();
  const { user } = useAuth();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [sameAsBilling, setSameAsBilling] = useState(false);
  const { order } = useSelector((state) => state.order);

  const calculateTotalPrice = () => {
    return (
      cart.cart?.items?.reduce(
        (total, item) => total + item.productId.price * item.quantity,
        0
      ) || 0
    );
  };

  const handleRazorpayPayment = async (amount, orderId) => {
    try {
      const res = await dispatch(processPayment(amount)); // 🟢 Process payment with Razorpay
  
      if (res.success) {
        const options = {
          key: "rzp_test_6QxtxGvVbOhFvu", // Replace with your Razorpay key
          amount: res.order.amount,
          currency: res.order.currency,
          name: "Editsh",
          description: "Purchase Payment",
          order_id: res.order.id,
          theme: { color: "#262626" },
  
          // ✅ Razorpay Payment Handler
          handler: async function (response) {
            try {
              const paymentData = {
                orderId: orderId,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
              };
  
              console.log("🟢 Payment Data:", paymentData);
  
              // 🟢 Verify Payment
              const verifyRes = await dispatch(verifyPayment(paymentData));
              console.log("🟢 Payment Verification Response:", verifyRes);
  
              if (verifyRes.payload?.success) {
                alert("✅ Payment verified successfully!");
              } else {
                alert("❌ Payment verification failed!");
              }
            } catch (verificationError) {
              console.error("❌ Payment verification error:", verificationError);
              alert("❌ Payment verification failed. Please try again.");
            }
          },
        };
  
        const razor = new window.Razorpay(options); // Initialize Razorpay modal
        razor.open();
      } else {
        alert("❌ Payment initialization failed. Please try again.");
      }
    } catch (error) {
      console.error("❌ Payment processing error:", error);
      alert("❌ Payment processing failed. Please try again.");
    }
  };
  
  const handleSubmit = async (values, { setSubmitting }) => {
    const orderData = {
      ...values,
      userId: user.user._id,
      items: cart.cart?.items.map((item) => ({
        productId: item.productId._id,
        quantity: item.quantity,
        price: item.productId.price,
      })),
      amount: calculateTotalPrice(),
      paymentMethod: values.paymentMethod,
    };
  
    try {
      // Create the order and capture the response directly
      const orderResponse = await dispatch(createOrder(orderData));
      
      if (values.paymentMethod === "COD") {
        // For COD, clear cart and navigate directly
        navigate("/profile");
      } else if (values.paymentMethod === "Razorpay") {
        // Extract orderId from the API response
        const orderId = orderResponse.payload?.newOrder?._id;
        if (orderId) {
          await handleRazorpayPayment(orderData.amount, orderId);
        } else {
          alert("Order ID not found. Please try again.");
        }
      }
    } catch (error) {
      console.error("Order creation error:", error);
      alert("Order creation failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };
  
  

  const initialValues = {
    billingAddress: {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      zipcode: "",
      country: "",
      state: "",
      city: "",
      address: "",
    },
    shippingAddress: {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      zipcode: "",
      country: "",
      state: "",
      city: "",
      address: "",
    },
    paymentMethod: "",
  };

  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Formik
            initialValues={initialValues}
            validationSchema={CheckoutSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, values, setFieldValue }) => (
              <Form>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Typography variant="h6">Billing Address</Typography>
                    <Grid container spacing={2}>
                      {Object.keys(AddressSchema.fields).map((field) => (
                        <Grid key={field} item xs={12} md={6}>
                          <Field
                            as={TextField}
                            fullWidth
                            label={field}
                            name={`billingAddress.${field}`}
                            size="small"
                          />
                          <ErrorMessage
                            name={`billingAddress.${field}`}
                            component="div"
                            style={{ color: "red" }}
                          />
                        </Grid>
                      ))}
                    </Grid>
                  </Grid>

                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={sameAsBilling}
                          onChange={(e) => {
                            setSameAsBilling(e.target.checked);
                            setFieldValue(
                              "shippingAddress",
                              e.target.checked
                                ? values.billingAddress
                                : initialValues.shippingAddress
                            );
                          }}
                        />
                      }
                      label="Same as Billing Address"
                    />
                  </Grid>

                  {!sameAsBilling && (
                    <Grid item xs={12}>
                      <Typography variant="h6">Shipping Address</Typography>
                      <Grid container spacing={2}>
                        {Object.keys(AddressSchema.fields).map((field) => (
                          <Grid key={field} item xs={12} md={6}>
                            <Field
                              as={TextField}
                              fullWidth
                              label={field}
                              name={`shippingAddress.${field}`}
                              size="small"
                            />
                            <ErrorMessage
                              name={`shippingAddress.${field}`}
                              component="div"
                              style={{ color: "red" }}
                            />
                          </Grid>
                        ))}
                      </Grid>
                    </Grid>
                  )}

                  <Grid item xs={12}>
                    <FormControl>
                      <FormLabel>Payment Method</FormLabel>
                      <Field name="paymentMethod">
                        {({ field }) => (
                          <RadioGroup {...field}>
                            <FormControlLabel
                              value="COD"
                              control={<Radio />}
                              label="Cash on Delivery"
                            />
                            <FormControlLabel
                              value="Razorpay"
                              control={<Radio />}
                              label="Razorpay"
                            />
                          </RadioGroup>
                        )}
                      </Field>
                      <ErrorMessage
                        name="paymentMethod"
                        component="div"
                        style={{ color: "red" }}
                      />
                    </FormControl>
                  </Grid>

                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      disabled={isSubmitting}
                    >
                      {values.paymentMethod === "Razorpay"
                        ? "Pay Now"
                        : "Place Order"}
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </Grid>

        <Grid item xs={12} md={6} lg={4}>
          <Box
            sx={{
              boxShadow: 3,
              p: 2,
              border: "1px solid #ccc",
              borderRadius: 3,
            }}
          >
            <Typography variant="h6">Your Order</Typography>
            <Divider sx={{ my: 2 }} />
            {cart.cart?.items.map((item) => (
              <Box
                key={item.productId._id}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 1,
                }}
              >
                <Badge badgeContent={item.quantity} color="primary">
                  <img
                    src={item.productId.ProductImage}
                    alt={item.productId.name}
                    style={{
                      height: "60px",
                      width: "60px",
                      borderRadius: "10px",
                    }}
                  />
                </Badge>
                <Typography>
                  {item.productId.name} - ₹{item.productId.price}
                </Typography>
              </Box>
            ))}
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6">
              Total: ₹{calculateTotalPrice().toFixed(2)}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Checkout;
