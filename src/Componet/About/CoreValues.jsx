import React from "react";
import { Box, Container, Grid, Typography, Card, CardMedia, CardContent } from "@mui/material";
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
        <Typography
          sx={{
            fontSize: { xs: "28px", md: "36px" },
            fontWeight: "700",
            textAlign: "center",
            mb: 4,
          }}
        >
          Core Values That Define Us
        </Typography>
        <Grid container spacing={4}>
          {sections.map((section, index) => (
            <Grid key={index} item xs={12} sm={6} md={4}>
              <Card
                sx={{
                  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                  borderRadius: "12px",
                  transition: "transform 0.3s",
                  "&:hover": { transform: "scale(1.05)" },
                }}
              >
                <CardMedia
                  component="img"
                  image={section.image}
                  alt={section.title}
                  sx={{
                    height: "100px",
                    width:'100px',
                    margin:'auto',
                  }}
                />
                <CardContent>
                  <Typography
                    sx={{
                      fontSize: "20px",
                      fontWeight: "600",
                      textAlign: "center",
                      mb: 2,
                    }}
                  >
                    {section.title}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "16px",
                      color: theme.palette.grey[700],
                      textAlign: "center",
                    }}
                  >
                    {section.content}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default CoreValues;
