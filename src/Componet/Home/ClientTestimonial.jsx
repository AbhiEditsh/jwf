import React from "react";
import Slider from "react-slick";
import { Avatar, Box, Container, Typography } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import theme from "../../theme/theme";

const testimonials = [
  {
    id: 1,
    name: "Alex Ritchell",
    image:
      "https://i.postimg.cc/SKPVCvXz/3d-illustration-person-with-sunglasses-23-2149436188.avif",
    review:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. ",
    rating: 5,
  },
  {
    id: 2,
    name: "Leaaxa Maey",
    image:
      "https://i.postimg.cc/SKPVCvXz/3d-illustration-person-with-sunglasses-23-2149436188.avif",
    review:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. ",
    rating: 5,
  },
  {
    id: 3,
    name: "Alan Sears",
    image:
      "https://i.postimg.cc/SKPVCvXz/3d-illustration-person-with-sunglasses-23-2149436188.avif",
    review:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. ",
    rating: 5,
  },
];

const ClientTestimonial = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <>
      <Box
        sx={{
          my: {
            xs: 2,
            md: 4,
          },
          pb: {
            xs: 2,
            md: 6,
          },
        }}
      >
        <div className="client-image">
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              width: "100%",
              py: {
                xs: 2,
                md: 4,
              },
            }}
          >
            <Typography
              variant="h5"
              gutterBottom
              sx={{ fontWeight: "bold", color: theme.palette.white.main }}
            >
              What our client say
            </Typography>
            <Box
              sx={{
                width: "200px",
                display: "block",
                height: "3px",
                textAlign: "center",
                borderRadius: "50%",
                backgroundColor: theme.palette.primary.main,
              }}
            ></Box>
          </Box>
          <Container>
            <Slider {...settings} >
              {testimonials.map((testimonial) => (
                <Box>
                  <Box
                    key={testimonial.id}
                    sx={{
                      mx: 2,
                      borderBottom: `4px solid ${theme.palette.primary.main} `,
                    }}
                    className="testimonial-card"
                  >
                    <Avatar
                      src={testimonial.image}
                      alt={testimonial.name}
                      sx={{
                        width: 80,
                        height: 80,
                        margin: "0 auto",
                        border: `3px double ${theme.palette.grey.main} `,
                      }}
                    />
                    <Typography variant="h6" sx={{ mt: 2 }}>
                      {testimonial.name}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        gap: 0.5,
                      }}
                    >
                      {Array.from({ length: testimonial.rating }).map(
                        (_, i) => (
                          <StarIcon key={i} sx={{ fontSize: "14px" }} />
                        )
                      )}
                    </Box>
                    <Typography
                      variant="body2"
                      sx={{ my: 2, color: "text.secondary" }}
                    >
                      {testimonial.review}
                    </Typography>
                    <FormatQuoteIcon fontSize="large" />
                  </Box>
                </Box>
              ))}
            </Slider>
          </Container>
        </div>
      </Box>
    </>
  );
};

export default ClientTestimonial;
