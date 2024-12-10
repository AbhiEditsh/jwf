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
import { Link } from "react-router-dom";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

const TopHeader = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const socialLinks = [
    {
      href: "#",
      Icon: FacebookOutlinedIcon,
    },
    {
      href: "#",
      Icon: TwitterIcon,
    },
    {
      href: "#",
      Icon: InstagramIcon,
    },
    {
      href: "#",
      Icon: LinkedInIcon,
    },
    {
      href: "#",
      Icon: WhatsAppIcon,
    },
  ];

  return (
    <Grid
      container
      row
      spacing={1}
      sx={{
        display: "flex-start",
        alignItems: "center",
        background: theme.palette.lightgrey.main,
      }}
    >
      <Grid item xs={12} sm={6}>
        <Box
          display="flex"
          alignItems="center"
          sx={{
            justifyContent: {
              xs: "center",
              sm: "flex-start",
            },
          }}
        >
          <Box display="flex" alignItems="center" sx={{ mr: 2 }}>
            <IconButton size="small">
              <PhoneIcon sx={{ color: theme.palette.primary.main }} />
            </IconButton>
            <Typography
              variant="body2"
              sx={{ fontSize: isMobile ? "12px" : "14px" }}
            >
              <Link
                to="tel:+919510951483"
                style={{
                  color: theme.palette.black.main,
                }}
              >
                +91 9510951483
              </Link>
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
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: {
                xs:'center',
                md:'end'
              },
              gap: "4px",
              px: 2,
            }}
          >
            {socialLinks.map((social, index) => (
              <Link href={social.href} key={index} target="_blank">
                <social.Icon
                  sx={{
                    fontSize: "20px",
                    color: theme.palette.primary.main,
                    mx: "2px",
                    ml: 3,
                    "&:hover": {
                      transition: "transform 0.3s ease-in-out",
                      color: theme.palette.black.main,
                    },
                  }}
                />
              </Link>
            ))}
          </Box>
        </Typography>
      </Grid>
    </Grid>
  );
};

export default TopHeader;
