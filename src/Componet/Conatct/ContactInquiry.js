import React, { useEffect } from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useFormik } from "formik";
import "react-toastify/dist/ReactToastify.css";
import theme from "../../theme/theme";
import { createInquiry } from "../../redux/actions/productActions";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

const ContactInquiry = () => {
  const dispatch = useDispatch();
  const inquiryState = useSelector((state) => state.inquiry);
  const { success, error } = inquiryState;

  const iconStyle = {
    background: theme.palette.primary.main,
    color: theme.palette.white.main,
    width: "30px",
    height: "30px",
    borderRadius: "10%",
    padding: "5px",
  };

  const contactDetails = [
    {
      icon: <PhoneIcon sx={iconStyle} />,
      title: "Call to Us",
      description: "Phone: +91 76989 88190",
    },
    {
      icon: <EmailIcon sx={iconStyle} />,
      title: "Write to Us",
      description: "Emails: export@lunexinternational.com",
    },
    {
      icon: <LocationOnIcon sx={iconStyle} />,
      title: "Store Address",
      description: "SHOP NO.9, Surat, Gujarat",
    },
    {
      icon: <QueryBuilderIcon sx={iconStyle} />,
      title: "Store Hours",
      description: "Mon-Sat: 11:00 am - 06:00 pm",
    },
  ];

  useEffect(() => {
    if (success) {
      toast.success("Inquiry submitted successfully!");
    }
    if (error) {
      toast.error(`Error: ${error}`);
    }
  }, [success, error]);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      message: "",
    },
    onSubmit: async (values, { resetForm }) => {
      dispatch(createInquiry(values));
      resetForm();
    },
  });

  return (
    <Box sx={{ mt: { sm: 6, xs: 8 } }}>
      <ToastContainer positionposition="top-center" />
      <Container>
        <Box sx={{ position: "relative" }}>
          <Typography
            sx={{
              display: "flex",
              justifyContent: "center",
              fontSize: { lg: "40px", md: "34px", sm: "24px", xs: "28px" },
              fontWeight: "600",
            }}
          >
            Let’s Grow Together
          </Typography>
          <Box sx={{ mt: { xs: 5, sm: 8 } }}>
            <Grid container spacing={2} alignItems={"center"}>
              <Grid item xs={12} sm={5}>
                <Box sx={{ mb: { sm: 0, xs: 5 } }}>
                  {contactDetails.map((detail, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        mb: 3,
                      }}
                    >
                      <IconButton
                        sx={{ background: "theme.palette.primary.main", mr: 2 }}
                        size="small"
                      >
                        {detail.icon}
                      </IconButton>
                      <Box>
                        <Typography
                          variant="h6"
                          fontWeight="bold"
                          sx={{ color: "theme.palette.primary.main" }}
                        >
                          {detail.title}
                        </Typography>
                        <Typography variant="body1" sx={{ color: "#686868" }}>
                          {detail.description}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Grid>
              <Grid item xs={12} sm={7}>
                <Box
                  sx={{
                    boxShadow: "0px 1px 10px rgba(153, 153, 153, 0.5)",
                    p: 4,
                    backgroundColor: theme.palette.lightgrey.main,
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: { xs: "20px", sm: "18px", md: "22px" },
                      fontWeight: 600,
                      mb: 6,
                    }}
                    align="center"
                  >
                    Send Inquiry
                  </Typography>
                  <form onSubmit={formik.handleSubmit}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <input
                          fullWidth
                          placeholder="Enter Name"
                          name="name"
                          value={formik.values.name}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          style={{
                            width: "100%",
                            backgroundColor: "#F9F9F9",
                            padding: "10px",
                            border: "1px solid #ccc",
                            borderRadius: "4px",
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <input
                          fullWidth
                          placeholder="Enter Email"
                          name="email"
                          value={formik.values.email}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          style={{
                            width: "100%",
                            backgroundColor: "#F9F9F9",
                            padding: "10px",
                            border: "1px solid #ccc",
                            borderRadius: "4px",
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <textarea
                          placeholder="Write Message....."
                          name="message"
                          value={formik.values.message}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          rows="6"
                          style={{
                            width: "100%",
                            backgroundColor: "#F9F9F9",
                            padding: "10px",
                            border: "1px solid #ccc",
                            borderRadius: "4px",
                          }}
                        ></textarea>
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
                          sx={{
                            backgroundColor: theme.palette.primary.main,
                            color: "#FFF",
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
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default ContactInquiry;
