import { Box, Button, Typography } from "@mui/material";
import React from "react";
import theme from "../../theme/theme";
import { Link } from "react-router-dom";

function FullSection() {
  return (
    <Box>
      <div className="full-section">
        <div className="fullsection-content">
          <Typography
            sx={{
              fontSize: {
                xs: "25px",
                md: "40px",
                lg: "50px",
              },
              color: theme.palette.primary.main,
            }}
            data-aos="zoom-out"
            data-aos-duration="2000"
          >
            New Peal & Gold Jewellery
          </Typography>
          <Typography
            sx={{
              fontSize: {
                xs: "14px",
                md: "16px",
              },
              color: theme.palette.white.main,
              fontStyle: "italic",
              textAlign: "center",
            }}
            data-aos="zoom-out"
            data-aos-duration="2000"
          >
            World The Best Commercial selling Gold jewelleryStore.
          </Typography>
          <Link to="/collection" style={{}}>
            <Button
              sx={{
                background: "transparent",
                color: theme.palette.white.main,
                borderBottom: `2px double ${theme.palette.primary.main} `,
                my: 2,
              }}
              data-aos="zoom-out"
              data-aos-duration="2000"
            >
              More Collection
            </Button>
          </Link>
        </div>
      </div>
    </Box>
  );
}

export default FullSection;
