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
import { LoginData } from "../../redux/actions/productActions";

const Login = () => {
  const dispatch = useDispatch();
  const { error, data } = useSelector((state) => state.Login);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      dispatch(LoginData(values));
      resetForm();
    },
  });

  useEffect(() => {
    if (data) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("refreshToken", data.refreshToken);
      localStorage.setItem("user", JSON.stringify(data.user));
      
      navigate("/home");
      toast.success(data.message || "Login successful!");  
      formik.resetForm();
    } else if (error) {
      toast.error(error);
    }
    // eslint-disable-next-line
  }, [error, data]);
  

  return (
    <>
     <ToastContainer position="top-center" autoClose={3000} />
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
          <Typography variant="h5" align="center" gutterBottom>
            Login
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            {/* Email Field */}
            <TextField
              fullWidth
              label="Email"
              name="email"
              variant="outlined"
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
              {formik.isSubmitting ? <CircularProgress size={24} /> : "Login"}
            </Button>

            <Typography
              sx={{
                textAlign: "center",
              }}
            >
              Don't have account?
              <Link
                to="/register"
                style={{
                  color: theme.palette.primary.main,
                  margin: "0 10px",
                }}
              >
                Register
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
    </>
  );
};

export default Login;
