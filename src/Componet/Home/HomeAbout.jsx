import { Box, Container, Grid, Typography } from "@mui/material";
import React from "react";
import theme from "../../theme/theme";
import { Link } from "react-router-dom";

function HomeAbout() {
  return (
    <>
      <Box
        sx={{
          my: {
            xs: 4,
            md: 8,
          },
        }}
      >
        <Container>
          <Grid container spacing={2} row>
            <Grid
              item
              xs={12}
              md={6}
              lg={6}
              data-aos="zoom-in-right"
              data-aos-duration="2000"
            >
              <Box>
                <div className="box_image">
                  <img
                    src="https://i.postimg.cc/13mB9xx3/modal-ring.webp"
                    alt="about-image"
                    style={{
                      borderTopLeftRadius: "50%",
                      borderBottomRightRadius: "50%",
                    }}
                  />
                </div>
              </Box>
            </Grid>
            <Grid item xs={12} md={6} lg={6}
             data-aos="zoom-in-left"
             data-aos-duration="2000">
              <Box>
                <Typography
                  sx={{
                    fontSize: "18px",
                    color: theme.palette.primary.main,
                    fontWeight: "600",
                  }}
                >
                  About Us
                </Typography>
                <Box
                  sx={{
                    dispay: "block",
                    width: "12%",
                    height: "3px",
                    backgroundColor: theme.palette.primary.main,
                    borderRadius: "50%",
                  }}
                ></Box>
                <Typography
                  sx={{
                    fontSize: {
                      xs: "20px",
                      md: "30px",
                    },
                    pb: 2,
                  }}
                >
                  JEWELLERY STORE
                </Typography>
                <Typography
                  sx={{
                    color: theme.palette.grey.main,
                    fontSize: "14px",
                    pb: 2,
                  }}
                >
                  Offering consumers a choice of glittering options for their
                  decoration to improve their appearance is a crucial component
                  of XYZ Gold's company.
                </Typography>
                <Typography
                  sx={{
                    color: theme.palette.grey.main,
                    fontSize: "14px",
                    pb: 2,
                  }}
                >
                  Our brand has a long history of being associated with
                  aspirational jewellery for young Indians with a regal and
                  elegant taste as well as wedding jewellery, celebration
                  jewellery, and festive jewellery.
                </Typography>
                <Typography
                  sx={{
                    color: theme.palette.grey.main,
                    fontSize: "14px",
                    pb: 2,
                  }}
                >
                  Our brand's exquisite, calm, and feminine designs, in our
                  opinion, exemplify femininity, elegance, and grace.
                </Typography>
                <Link
                  to="/collection"
                  style={{
                    pasdding: "10px 20px",
                    borderBottom: `1px solid ${theme.palette.primary.main}`,
                    color: theme.palette.primary.main,
                  }}
                >
                  More Collection
                </Link>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}

export default HomeAbout;
