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
import { RegisterData } from "../../redux/actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import theme from "../../theme/theme";
import logo from "../../assets/image/images.jfif";
const Register = () => {
  const dispatch = useDispatch();
  const { error, data } = useSelector((state) => state.Register);
  const navigate = useNavigate();
  // Formik configuration
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(3, "Username must be at least 3 characters")
        .required("Username is required"),
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),
    onSubmit: (values, { resetForm }) => {
      dispatch(RegisterData(values));
      resetForm();
    },
  });

  useEffect(() => {
    if (data) {
      toast.success(data);
      navigate("/login");
      formik.resetForm();
    } else if (error) {
      toast.error(error);
    }
    // eslint-disable-next-line
  }, [error, data]);

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
          Register
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          {/* Username Field */}
          <TextField
            fullWidth
            label="Username"
            name="username"
            variant="outlined"
            placeholder="Please enter username....."
            margin="normal"
            size="small"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
          />

          {/* Email Field */}
          <TextField
            fullWidth
            label="Email"
            name="email"
            variant="outlined"
            placeholder="Please enter email....."
            margin="normal"
            size="small"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />

          {/* Password Field */}
          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            placeholder="Please enter password....."
            variant="outlined"
            size="small"
            margin="normal"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />

          {/* Submit Button */}
          <Button
            type="submit"
            variant="outlined"
            color="primary"
            sx={{
              mt: 2,
              maxWidth: "120px",
              width: "100%",
              margin: "10px auto",
              display: "block",
              borderRadius: "50px",
            }}
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? <CircularProgress size={24} /> : "Register"}
          </Button>

          <Typography
            sx={{
              textAlign: "center",
            }}
          >
            Already have an account
            <Link
              to="/login"
              style={{
                color: theme.palette.primary.main,
                margin: "0 10px",
              }}
            >
              Login
            </Link>
          </Typography>

          <Box sx={{ mt: 2, p: 1, boxShadow: 1, borderRadius: 2 }}>
            <Typography
              sx={{
                textAlign: "center",
              }}
            >
              Forgot your password
              <Link
                to="/forgot-password"
                style={{
                  color: theme.palette.primary.main,
                  margin: "0 10px",
                }}
              >
                Reset It
              </Link>
            </Typography>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default Register;
