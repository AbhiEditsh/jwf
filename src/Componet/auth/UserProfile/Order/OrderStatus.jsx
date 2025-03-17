import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Chip,
  CircularProgress,
  Alert,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
<<<<<<< HEAD
=======
  Card,
>>>>>>> Product-check
  CardContent,
  useMediaQuery,
  useTheme,
  Grid,
} from "@mui/material";
import OutboundIcon from "@mui/icons-material/Outbound";
import { getUserOrders } from "../../../../redux/actions/productActions";

<<<<<<< HEAD
=======
// Function to get chip color based on order status
>>>>>>> Product-check
const getStatusChipColor = (status) => {
  switch (status) {
    case "Pending":
      return "default";
    case "Shipped":
      return "primary";
    case "Delivered":
      return "success";
    case "Cancelled":
      return "error";
    default:
      return "default";
  }
};

// Format Date
const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const OrderStatus = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userOrders = useSelector((state) => state.userOrders);
  const { loading, orders, error } = userOrders;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    dispatch(getUserOrders());
  }, [dispatch]);

  return (
    <Container>
      {loading && <CircularProgress />}
      {error && <Alert severity="error">{error}</Alert>}
      {orders && orders.length > 0 ? (
        isMobile ? (
          <Grid container spacing={3}>
            {orders.map((order, index) => (
              <Grid item xs={12} key={order._id}>
                <Box>
                  <CardContent>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Box>
                        <Typography variant="h6">Order:{index + 1}</Typography>
                        <Typography>
                          Date: {formatDate(order.createdAt)}
                        </Typography>
                      </Box>
                      <Box>
                        <Chip
                          size="small"
                          label={order.status}
                          color={getStatusChipColor(order.status)}
                        />
                      </Box>
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography>
                        Total: ₹{order.amount}
                        <span
                          style={{
                            color: theme.palette.primary.main,
                            marginLeft: "10px",
                          }}
                        >
                          {order.items.length} Items
                        </span>
                      </Typography>
                      <OutboundIcon
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          navigate(`/orders/${order._id}`, {
                            state: { order },
                            replace: true,
                          })
                        }
                      />
                    </Box>
                  </CardContent>
                </Box>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box sx={{ overflowX: "auto" }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Order</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="center">Total</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((order, index) => (
                  <TableRow key={order._id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{formatDate(order.createdAt)}</TableCell>
                    <TableCell>
                      <Chip
                        label={order.status}
                        color={getStatusChipColor(order.status)}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Typography>₹{order.amount}</Typography>{" "}
                      {order.items.length} Items
                    </TableCell>
                    <TableCell align="center">
                      <OutboundIcon
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          navigate(`/orders/${order._id}`, {
                            state: { order },
                            replace: true,
                          })
                        }
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        )
      ) : (
        <Typography>No orders found</Typography>
      )}
    </Container>
  );
};

export default OrderStatus;
