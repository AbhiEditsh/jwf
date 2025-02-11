import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import theme from "../../theme/theme";
import logo from "../../assets/image/images.jfif";
import { ForgotData } from "../../redux/actions/productActions";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const forgotState = useSelector((state) => state.Forgot);
  const { error, data, loading } = forgotState || {
    error: null,
    data: null,
    loading: false,
  };
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
    }),
    onSubmit: (values, { resetForm }) => {
      dispatch(ForgotData(values));
      resetForm();
    },
  });

  useEffect(() => {
    if (data) {
      toast.success(data);
      formik.resetForm();
      navigate("/reset-password");
    } else if (error) {
      toast.error(error);
    }
  }, [error, data, formik, navigate]);

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 5, p: 3, boxShadow: 3, borderRadius: 2 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <img
            src={logo}
            alt="logo"
            style={{
              width: "100%",
              maxWidth: "100px",
              height: "100px",
              margin: "0 auto",
              textAlign: "center",
            }}
          />
        </Box>
        <ToastContainer position="top-center" />
        <Typography variant="h5" align="center" gutterBottom>
          Forgot Password
        </Typography>
        <Typography
          sx={{
            textAlign: "center",
          }}
        >
          Remember your password?
          <Link
            to="/login"
            style={{
              color: theme.palette.primary.main,
              margin: "0 10px",
            }}
          >
            Login Here..
          </Link>
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            variant="outlined"
            placeholder="Please enter email..."
            margin="normal"
            size="small"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <Button
            type="submit"
            variant="outlined"
            color="primary"
            sx={{
              mt: 2,
              maxWidth: "170px",
              width: "100%",
              margin: "10px auto",
              display: "block",
              borderRadius: "50px",
            }}
          >
            {loading ? <CircularProgress size={24} /> : "Reset Password"}
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default ForgotPassword;
