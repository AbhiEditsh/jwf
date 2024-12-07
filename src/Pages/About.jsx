import React from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import theme from "../theme/theme";
import whychooseuse from "../assets/image/whychooseus.webp";
import CoreValues from "../Componet/About/CoreValues";

function About() {
  return (
    <Box sx={{ mt: { sm: 6, xs: 8 } }}>
      <Container>
        {/* About Section */}
        <Box sx={{ py: { xs: 4, md: 6 } }}>
          <Typography
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              fontSize: { lg: "32px", md: "30px", sm: "28px", xs: "24px" },
              fontWeight: "600",
              mb: 1,
            }}
          >
            About XYZ Gold
          </Typography>
          <Typography
            sx={{
              color: theme.palette.grey.main,
              pb: 2,
              textAlign: "center",
            }}
          >
            Every item of jewellery has a story to tell, and XYZ gold crafts
            lovely tales to be treasured! Beautiful jewellery brings eternal
            happiness in the hearts of women and men, and we have worked for 25
            years to establish our brand name as being synonymous with
            outstanding quality, unique designs, and reasonable prices.
          </Typography>
          <Typography
            sx={{ color: theme.palette.grey.main, textAlign: "center" }}
          >
            We guarantee your satisfaction, the best possible quality, and
            enduring dependability in all of your dealings. With our objective
            being to surpass every client's expectation, we intend to fulfill
            your requirements.
          </Typography>
        </Box>

        {/* Loyalty Section */}
        <Box sx={{ py: { xs: 4, md: 6 } }}>
          <Typography
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              fontSize: { lg: "32px", md: "30px", sm: "28px", xs: "24px" },
              fontWeight: "600",
              mb: 1,
            }}
          >
            “Our Loyalty to customers is priceless just like our jewels”
          </Typography>
          <Typography
            sx={{
              color: theme.palette.grey.main,
              pb: 2,
              textAlign: "center",
            }}
          >
            We deliver exotic and beautiful pieces of joy to our customers. We
            are one of the most trustworthy jewellery brands in the entire city
            of Surat thanks to our many years of experience and thousands of
            satisfied consumers.
          </Typography>
        </Box>

        {/* Why Choose Us Section */}
        <Box sx={{ py: { xs: 4, md: 6 } }}>
          <Grid container spacing={2}>
            {/* Left Column */}
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <Typography
                sx={{
                  fontSize: { lg: "30px", md: "26px", sm: "24px" },
                  fontWeight: "600",
                  mb: 2,
                }}
              >
                Why you need to choose XYZ gold?
              </Typography>
              <Typography
                sx={{
                  color: theme.palette.grey.main,
                  mb: 2,
                }}
              >
                We employ a cutting-edge production facility that elevates
                jewelry manufacture to new artistic heights, guaranteeing that
                even our smallest designs are made with the utmost care. Our
                designs are distinguished by their use of classic design
                elements with contemporary aesthetics.
              </Typography>
              <Box
                component="ul"
                sx={{ p: 0, pl: 2, color: theme.palette.grey.main }}
              >
                <li>💎 Transparency</li>
                <li>💎 Unique Collection</li>
                <li>💎 10,000+ Customer Satisfaction</li>
                <li>💎 Trusted Jewellery Showroom in Surat</li>
              </Box>
            </Grid>

            {/* Right Column */}
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <Box
                sx={{
                  height: "100%",
                  backgroundImage: `url(${whychooseuse})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  borderRadius: "8px",
                }}
              />
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ py: { xs: 4, md: 6 } }}>
          <CoreValues/>
        </Box>
      </Container>
    </Box>
  );
}

export default About;
