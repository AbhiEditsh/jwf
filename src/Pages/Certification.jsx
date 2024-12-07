import { Box, Container, Grid, Typography } from "@mui/material";
import React from "react";
import certificate from "../assets/image/certificate.webp";
import theme from "../theme/theme";

function Certification() {
  return (
    <>
      <Box>
        <Container>
          {/* IGI Certificate */}
          <Box>
            <Typography
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: { lg: "40px", md: "34px", sm: "24px", xs: "28px" },
                fontWeight: "600",
                py: 3,
              }}
            >
              Certification
            </Typography>
              <Grid container spacing={2} row alignItems="center">
                <Grid item xs={12} md={6}>
                  <Typography
                    sx={{
                      textAlign: "left",
                      pb: 2,
                      fontWeight: "700",
                      fontSize: {
                        xs: "18px",
                        sm: "40px",
                      },
                    }}
                  >
                    IGI
                    <Typography
                      component="span"
                      sx={{
                        fontSize: "20px",
                        fontWeight: "600",
                        ml: 2,
                        color: theme.palette.primary.main,
                      }}
                    >
                      [International Gemological Institute]
                    </Typography>
                  </Typography>
                  <Typography
                    sx={{
                      textAlign: "left",
                      pb: 4,
                    }}
                  >
                    Lab Grown Diamond Certification (most Commonly From Labs
                    IGI, SGL, Certificate) Is A Physical And Electronic Document
                    You Receive From Authentic Labs That Describe A Diamond’s
                    Characteristics.
                  </Typography>
                  <Typography
                    sx={{
                      textAlign: "left",
                    }}
                  >
                    Lab Grown Diamonds Certification Is The Evidence That Your
                    Purchased Diamond Passed All The Decided Standards By
                    Authentic Laboratories Like IGI.
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <div className="certificate-image">
                    <img
                      src={certificate}
                      alt="certificate_image"
                      width={`100%`}
                      height={`100%`}
                    />
                  </div>
                </Grid>
              </Grid>
          </Box>

          {/* Why Choose Us */}
          <Box>
            <Typography
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: { lg: "40px", md: "34px", sm: "24px", xs: "28px" },
                fontWeight: "600",
                py: 2,
              }}
            >
              What is certified diamonds?
            </Typography>
            <Box
              sx={{
                py: {
                  xs: 2,
                  lg: 4,
                },
              }}
            >
              <Typography sx={{ textAlign: "center", pb: 2 }}>
                When You Purchase The Lab Grown Diamond You Make Sure That It Is
                Real And You Don’t Get Cheated By The Seller, Right? But, Feel
                Free To Purchase A Lab Diamond With Certification Because
                Certified Diamond Is Approved By Trustworthy Labs.
              </Typography>
              <Typography sx={{ textAlign: "center", pb: 2 }}>
                The Certification Report Carries All Information About Diamonds
                4’Cs, Symmetry, Dimension, Fluorescence. So Always Purchased
                Certified Diamonds For Your Engagement Rings And Wedding
                Accessories.
              </Typography>
              <Typography sx={{ textAlign: "center", pb: 2 }}>
                In SGL, Certified Diamonds You Can Easily Find The 4’Cs With
                Exact Proportions. There Is No Need To Cross Check Because SGL
                Lab Has An Experienced Quality Inspector Who Checks The Diamond
                Quality. You Can Tell Us You Want SGL Certified Lab Diamonds
                Which We Can Give You.
              </Typography>
            </Box>
          </Box>
          {/* Why Purchase Our Product */}

          <Box>
            <Typography
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: { lg: "35px", md: "30px", sm: "24px", xs: "28px" },
                fontWeight: "600",
                py: 2,
              }}
            >
              Why You Can Purchase Lab Grown Diamonds From XYZ Jewels?💍
            </Typography>
            <Box
              sx={{
                py: {
                  xs: 2,
                  lg: 4,
                },
              }}
            >
              <Typography sx={{ textAlign: "center", pb: 2 }}>
                XYZ Jewels Carries Only The Best Color, Clarity Graded Diamonds
                Which You Can See In The Certification Report. Lab Grown
                Diamonds Are Made From Artificial Methods..
              </Typography>

              <Typography
                sx={{
                  textAlign: "center",
                  fontSize: "20px",
                  py:2,
                  fontWeight:'600'
                }}
              >
                Thank You🙏
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default Certification;
