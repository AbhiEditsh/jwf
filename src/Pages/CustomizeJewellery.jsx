import React from "react";
import { Grid, Typography, Box, Container } from "@mui/material";
import image1 from "../assets/image/1.png";
import image2 from "../assets/image/2.png";
import image3 from "../assets/image/3.png";
import image4 from "../assets/image/4.png";
import image5 from "../assets/image/5.png";
import image6 from "../assets/image/6.png";
import image7 from "../assets/image/7.png";
import theme from "../theme/theme";

const processSteps = [
  {
    title: "Design",
    content:
      "Integrity, Transparency, Accountability And Credibility Are The Values We Cherish And Adhere To In All Aspects Of Dealings With Our Employees, Clients And Associates.",
    image: image1,
  },
  {
    title: "Quote",
    content:
      "After the design has been finalized, Xyz Jwwellers provides the customer with a quote for the custom piece of Jewelry. The quote includes the Price of Gold, Lab Grown Diamond, and making charge.",
    image: image2,
  },
  {
    title: "Design Approval",
    content:
      "After the Xyz Jewellers has created design, we send a photo or digital rendering to the customer for approval, the customer can provide feedback and request any changes they want made.",
    image: image3,
  },
  {
    title: "Order Confirmation",
    content:
      "If the customer decides to proceed with the purchase, they can make an advance payment online using a secure payment system. Remaining Payment at Product Delivery time in COD or Online.",
    image: image4,
  },
  {
    title: "Production",
    content:
      "Once the payment is received, Xyz Jwwellers begins the production process. Diamonds are carefully selected and expertly crafted into stunning pieces of Jewelry.",
    image: image5,
  },
  {
    title: "Inspection",
    content:
      "The finished piece is thoroughly inspected by Xyz Jewellers’s Expert Team to ensure that it meets the customer's requirements and is of the highest quality.",
    image: image6,
  },
  {
    title: "Certifications",
    content:
      "Jewellers Provides IGI Certificate for Solitaire Diamonds and SGL Certificate for Jewelry. Also Provides Gold with Hallmarking.",
    image: image7,
  },
];

const CustomizeJewellery = () => {
  return (
    <Box sx={{ mt: { sm: 6, xs: 8 } }}>
      <Container>
      <Typography
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: { lg: "40px", md: "34px", sm: "24px", xs: "28px" },
              fontWeight: "600",
              mb:1
            }}
          >
            Jewelry customisation process
          </Typography>
          <Box
                    sx={{
                      borderBottom: `4px solid ${theme.palette.primary.main}`,
                      borderRadius: "10px",
                      width: "20%",
                      mb: 3,
                      margin:'auto'
                    }}
                  ></Box>
        <Box sx={{ mt: { sm: 2, xs: 4 } }}>
          {processSteps.map((step, index) => (
            <Grid
              container
              spacing={4}
              key={index}
              alignItems={"center"}
              direction={index % 2 === 0 ? "row" : "row-reverse"}
              sx={{ marginBottom: 2 }}
            >
              {/* Image Section */}
              <Grid item xs={12} md={6}>
                <Box
                  sx={{
                    width: "300px",
                    height: "300px",
                    margin: "auto",
                  }}
                >
                  <img
                    src={step.image}
                    alt={step.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Box>
              </Grid>
              {/* Text Section */}
              <Grid item xs={12} md={6}>
                <Box>
                  <Typography
                    variant="h5"
                    gutterBottom
                    sx={{
                      fontWeight: "bold",
                      color: theme.palette.primary.mainm,
                    }}
                  >
                    {step.title}
                  </Typography>
                  <Box
                    sx={{
                      borderBottom: `4px solid ${theme.palette.primary.main}`,
                      borderRadius: "10px",
                      width: "20%",
                      mb: 3,
                    }}
                  ></Box>
                  <Typography variant="body1">{step.content}</Typography>
                </Box>
              </Grid>
            </Grid>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default CustomizeJewellery;
