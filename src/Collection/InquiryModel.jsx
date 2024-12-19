import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Box, IconButton, Grid, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import theme from "../theme/theme";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { createProductInquiry } from "../redux/actions/productActions";

const InquiryModel = ({ open, onClose, category }) => {
  const dispatch = useDispatch();
  const { success, error, data } = useSelector((state) => state.ProductInquiry);
  const validationSchema = Yup.object({
    firstname: Yup.string()
      .min(2, "First name must be at least 2 characters")
      .required("First name is required"),
    lastname: Yup.string()
      .min(2, "Last name must be at least 2 characters")
      .required("Last name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    mobile: Yup.string()
      .matches(/^\d{10}$/, "Mobile number must be 10 digits")
      .required("Mobile number is required"),
    category: Yup.string().required("Category is required"),
    message: Yup.string()
      .min(10, "Message must be at least 10 characters")
      .required("Message is required"),
  });
  useEffect(() => {
    if (success && data) {
      toast.success(data);
      formik.resetForm();
    } else if (error) {
      toast.error(error);
    }
    // eslint-disable-next-line
  }, [success, error, data]);

  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      mobile: "",
      category: category || "",
      message: "",
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      console.log("value", values);
      dispatch(createProductInquiry(values));
      resetForm();
    },
  });

  if (!open) return null;

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: theme.palette.white.main,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1300,
      }}
    >
      <ToastContainer positionposition="top-center" />
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: theme.palette.white.main,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1300,
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: { xs: "90%", md: "50%" },
            borderRadius: "8px",
            boxShadow: 24,
            backgroundColor: theme.palette.white.main,
            padding: "16px",
            overflowY: "auto",
            maxHeight: "90%",
          }}
        >
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: "absolute",
              top: "8px",
              right: "8px",
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <Box>
            <form onSubmit={formik.handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <input
                    placeholder="Enter First Name"
                    name="firstname"
                    value={formik.values.firstname}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    onFocus={(e) =>
                      (e.target.style.border = `1px solid ${theme.palette.primary.main}`)
                    }
                    style={{
                      width: "100%",
                      backgroundColor: "#F9F9F9",
                      padding: "10px",
                      borderRadius: "4px",
                    }}
                  />
                  {formik.touched.firstname && formik.errors.firstname && (
                    <div style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.firstname}
                    </div>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <input
                    placeholder="Enter Last Name"
                    name="lastname"
                    value={formik.values.lastname}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    onFocus={(e) =>
                      (e.target.style.border = `1px solid ${theme.palette.primary.main}`)
                    }
                    style={{
                      width: "100%",
                      backgroundColor: "#F9F9F9",
                      padding: "10px",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                    }}
                  />
                  {formik.touched.lastname && formik.errors.lastname && (
                    <div style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.lastname}
                    </div>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <input
                    placeholder="Enter Email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onFocus={(e) =>
                      (e.target.style.border = `1px solid ${theme.palette.primary.main}`)
                    }
                    onBlur={formik.handleBlur}
                    style={{
                      width: "100%",
                      backgroundColor: "#F9F9F9",
                      padding: "10px",
                      borderRadius: "4px",
                      border: "1px solid #ccc",
                    }}
                  />
                  {formik.touched.email && formik.errors.email && (
                    <div style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.email}
                    </div>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <input
                    placeholder="Enter Mobile Number"
                    name="mobile"
                    value={formik.values.mobile}
                    onChange={formik.handleChange}
                    onFocus={(e) =>
                      (e.target.style.border = `1px solid ${theme.palette.primary.main}`)
                    }
                    onBlur={formik.handleBlur}
                    style={{
                      width: "100%",
                      backgroundColor: "#F9F9F9",
                      padding: "10px",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                    }}
                  />
                  {formik.touched.mobile && formik.errors.mobile && (
                    <div style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.mobile}
                    </div>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <input
                    placeholder="Enter Category"
                    name="category"
                    value={formik.values.category}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    onFocus={(e) =>
                      (e.target.style.border = `1px solid ${theme.palette.primary.main}`)
                    }
                    style={{
                      width: "100%",
                      backgroundColor: "#F9F9F9",
                      padding: "10px",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                    }}
                  />
                  {formik.touched.category && formik.errors.category && (
                    <div style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.category}
                    </div>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <textarea
                    placeholder="Write Message....."
                    name="message"
                    value={formik.values.message}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    onFocus={(e) =>
                      (e.target.style.border = `1px solid ${theme.palette.primary.main}`)
                    }
                    rows="6"
                    style={{
                      width: "100%",
                      backgroundColor: "#F9F9F9",
                      padding: "10px",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                    }}
                  ></textarea>
                  {formik.touched.message && formik.errors.message && (
                    <div style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.message}
                    </div>
                  )}
                </Grid>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",
                    mt: 4,
                  }}
                >
                  <Button
                    type="submit"
                    disabled={!(formik.dirty && formik.isValid)}
                    sx={{
                      backgroundColor: !(formik.dirty && formik.isValid)
                        ? theme.palette.grey.main
                        : theme.palette.primary.main,
                      color: !(formik.dirty && formik.isValid)
                        ? theme.palette.black.main
                        : theme.palette.white.main,
                      borderRadius: 1,
                      p: 1,
                    }}
                  >
                    Submit
                  </Button>
                </Box>
              </Grid>
            </form>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default InquiryModel;
