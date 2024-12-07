import React from "react";
import { Box, Typography, Grid, Link, Container } from "@mui/material";
import theme from "../theme/theme";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

const footerData = [
  {
    title: "ABOUT US",
    content: [
      "Ethical elegance, certified! Shine responsibly with IGI/SGL & BIS Hallmark assurance, piece after precious piece.",
    ],
    icons: [
      "https://i.postimg.cc/SsC7pLp3/Hallmark-PNG-White.png",
      "https://i.postimg.cc/xjsq1JT4/SGL-PNG-White.png",
      "https://i.postimg.cc/cL7S62BL/IGI-PNG-White.png",
    ],
  },
  {
    title: "CUSTOMER SUPPORT",
    content: ["+91 9978845644", "+91 7845845644"],
  },
  {
    title: "INFORMATION",
    links: [
      { label: "About Us", href: "/About" },
      { label: "Certification", href: "/certification" },
      { label: "Collection", href: "/Collection" },
      { label: "Contact Us", href: "/contact-us" },
    ],
  },
  {
    title: "MORE TO KNOW",
    links: [
      { label: "Customize Jewelry", href: "/customize-jewelry" },
      { label: "Lab vs Natural", href: "/lab-vs-natural" },
      { label: "The 4 C's of Diamonds", href: "/the-4-cs-of-diamonds" },
      { label: "FAQ", href: "/faq" },
    ],
  },
];

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

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.white.main,
        mt:4
      }}
    >
      <Container>
        <Grid container spacing={4} sx={{ py: 2 }}>
          {footerData.map((section, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Typography variant="h6" sx={{ pb: 2 }}>
                {section.title}
              </Typography>
              {section.content && (
                <Typography variant="body2" paragraph>
                  {section.content.map((text, i) => (
                    <span
                      key={i}
                      sx={{
                        color: theme.palette.white.main,
                        transition: "color 0.3s ease, transform 0.3s ease",
                        "&:hover": {
                          color: theme.palette.white.main,
                          transform: "scale(1.1)",
                        },
                      }}
                    >
                      {text}
                      <br />
                    </span>
                  ))}
                </Typography>
              )}
              {section.links && (
                <ul style={{ listStyle: "none", padding: 0 }}>
                  {section.links.map((link, i) => (
                    <li key={i}>
                      <Typography
                        sx={{
                          color: theme.palette.white.main,
                          transition: "color 0.3s ease, transform 0.3s ease",
                          "&:hover": {
                            color: theme.palette.white.main,
                            transform: "scale(1.1)",
                          },
                        }}
                      >
                        <Link
                          href={link.href}
                          sx={{
                            color: theme.palette.white.main,
                            textDecoration: "none",
                          }}
                        >
                          {link.label}
                        </Link>
                      </Typography>
                    </li>
                  ))}
                </ul>
              )}
              {section.icons && (
                <Box sx={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                  {section.icons.map((icon, i) => (
                    <img
                      src={icon}
                      alt={`icon-${i}`}
                      key={i}
                      style={{ width: "80px", height: "80px" }}
                    />
                  ))}
                </Box>
              )}
            </Grid>
          ))}
        </Grid>

        {/* Social Icons Section */}
        <Grid container justifyContent="center" sx={{ p: 2 }}>
          <Box sx={{ display: "flex", justifyContent: "center", gap: "4px" ,px:2}}>
            {socialLinks.map((social, index) => (
              <Link href={social.href} key={index} target="_blank">
                <social.Icon
                  sx={{
                    fontSize: "30px",
                    color: theme.palette.white.main,
                    mx: "2px",
                    mr: 3,
                    transition: "transform 0.3s ease-in-out",
                    "&:hover": {
                      transform: "translateY(-10px)",
                      color: theme.palette.black.main,
                    },
                  }}
                />
              </Link>
            ))}
          </Box>
        </Grid>

        {/* Footer Bottom */}
        <Box
          sx={{
            borderTop: `1px dotted ${theme.palette.lightgrey.main}`,
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            py: 2,
          }}
        >
          <Typography
            variant="body2"
            sx={{ textAlign: "center", width: "100%" }}
          >
            Copyright by Luxica Jewels
          </Typography>
          <Typography
            variant="body2"
            sx={{ textAlign: "center", width: "100%" }}
          >
            Developed & Designed By Ikhodal Softech
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
