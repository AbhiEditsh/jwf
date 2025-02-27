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
import { ResetData } from "../../redux/actions/productActions";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const { data, error } = useSelector(
    (state) =>
      state.resetPassword || {
        data: null,
        error: null,
      }
  );

  const formik = useFormik({
    initialValues: {
      email: "",
      otp: "",
      newPassword: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Email is required"),
      otp: Yup.string().required("OTP is required"),
      newPassword: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("New password is required"),
    }),
    onSubmit: (values, { resetForm }) => {
      dispatch(ResetData(values));
      resetForm();
    },
  });

  useEffect(() => {
    if (data) {
      toast.success(data.message);
      navigate("/login")
    } else if (error) {
      toast.error(error.message);
    }
  }, [data, error]);

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 5, p: 3, boxShadow: 3, borderRadius: 2 }}>
        <ToastContainer position="top-center" />
        <Typography variant="h5" align="center" gutterBottom>
          Reset Password
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            variant="outlined"
            margin="normal"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />

          <TextField
            fullWidth
            label="OTP"
            name="otp"
            variant="outlined"
            margin="normal"
            value={formik.values.otp}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.otp && Boolean(formik.errors.otp)}
            helperText={formik.touched.otp && formik.errors.otp}
          />

          <TextField
            fullWidth
            label="New Password"
            name="newPassword"
            type="password"
            variant="outlined"
            margin="normal"
            value={formik.values.newPassword}
            v
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.newPassword && Boolean(formik.errors.newPassword)
            }
            helperText={formik.touched.newPassword && formik.errors.newPassword}
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
          >
            {formik.isSubmitting ? (
              <CircularProgress size={24} />
            ) : (
              "Submit"
            )}
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default ResetPassword;
