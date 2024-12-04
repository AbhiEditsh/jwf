import React from "react";
import {
  Box,
  Typography,
  useMediaQuery,
  IconButton,
  Grid,
} from "@mui/material";
import { Phone as PhoneIcon, Info as InfoIcon } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";

const TopHeader = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
      <Grid
        container
        row
        spacing={2}
        
        sx={{ display: "flex-start", alignItems: "center" ,px:4}}
      >
        <Grid item xs={12} sm={6}>
          <Box display="flex" alignItems="center" sx={{
            justifyContent:{
              xs: "center",
              sm: "flex-start"
            }
          }}>
            <Box display="flex" alignItems="center" sx={{mr:2}}>
              <IconButton size="small">
                <PhoneIcon sx={{ color: theme.palette.primary.main }} />
              </IconButton>
              <Typography
                variant="body2"
                sx={{ fontSize: isMobile ? "12px" : "14px" }}
              >
                76981 26500
              </Typography>
            </Box>
            <Box display="flex" alignItems="center">
              <IconButton>
                <InfoIcon sx={{ color: theme.palette.primary.main }} />
              </IconButton>
              <Typography
                variant="body2"
                sx={{ fontSize: isMobile ? "12px" : "14px" }}
              >
                Mon To Sun 9:00am To 8:30pm
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography
            sx={{
              fontSize: isMobile ? "12px" : "14px",
              textAlign: {
                xs: "center",
                sm: "right",
              },
              color: theme.palette.primary.main,
            }}
          >
            TODAY GOLD RATE 22kt 29/11/2024
          </Typography>
        </Grid>
      </Grid>
  );
};

export default TopHeader;
