import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import theme from "../../theme/theme";
import value from "../../assets/image/value.png";
import vision from "../../assets/image/vision.png";
import mission from "../../assets/image/mission.png";

function CoreValues() {
  const sections = [
    {
      image: value,
      title: "Our Value",
      content:
        "Integrity, Transparency, Accountability, and Credibility are the values we cherish and adhere to in all aspects of dealings with our employees, clients, and associates.",
    },
    {
      image: vision,
      title: "Our Vision",
      content:
        "To strengthen our position as the world’s most trusted supplier of premium, high-quality, eco-friendly, and meticulously manufactured lab-grown diamonds.",
    },
    {
      image: mission,
      title: "Our Mission",
      content:
        "Our mission is to make fine jewellery collections at unbelievable prices. We believe that luxury should not come at the cost of the environment, so when you choose to wear a jewelry piece, you make a statement that’s larger than a style statement.",
    },
  ];

  return (
    <Box sx={{ py: 6, backgroundColor: theme.palette.background.default }}>
      <Container>
        <Grid container spacing={4}>
          {sections.map((section, index) => (
            <Grid key={index} item xs={12} sm={6} md={4}  
            data-aos="zoom-in"
            data-aos-duration="3000">
              <Box
                sx={{
                  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                  borderRadius: "12px",
                  transition: "transform 0.3s",
                  border:'1px dotted #000',
                  display: "flex",
                  flexDirection: "column",
                  p:2,
                  height: "100%",
                  "&:hover": { transform: "scale(1.05)" },
                }}
              >
                <Box
                  sx={{
                    height: "100px",
                    width: "100px",
                    margin: "0 auto",
                    border:'1px dotted #000',
                    borderRadius:'50%',
                    padding:'10px'
                  }}
                >
                  <img
                    src={section.image}
                    alt={section.title}
                    style={{ maxWidth: "100%", maxHeight: "100%",paddingTop:'10px' }}
                  />
                </Box>
                <Box
                  sx={{
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "20px",
                      fontWeight: "600",
                      textAlign: "center",
                    }}
                  >
                    {section.title}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "14px",
                      color: theme.palette.grey[700],
                      textAlign: "center",
                    }}
                  >
                    {section.content}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default CoreValues;
