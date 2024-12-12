import React, { useEffect } from "react";
import Slider from "react-slick";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Box, Container, Typography } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import theme from "../../theme/theme";
import { getReview } from "../../redux/actions/productActions";

const ClientTestimonial = () => {
  const dispatch = useDispatch();
  const { review } = useSelector((state) => state.reviewList);

  useEffect(() => {
    dispatch(getReview());
  }, [dispatch]);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    arrows: false,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
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

  // Function to render stars based on rating
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating); // Count of full stars
    const hasHalfStar = rating % 1 >= 0.5; // Check for half star
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0); // Remaining empty stars

    return (
      <>
        {/* Render full stars */}
        {Array.from({ length: fullStars }).map((_, i) => (
          <StarIcon
            key={`full-${i}`}
            sx={{
              fontSize: "14px",
              color: theme.palette.warning.main,
            }}
          />
        ))}
        {/* Render half star */}
        {hasHalfStar && (
          <StarHalfIcon
            key="half-star"
            sx={{
              fontSize: "14px",
              color: theme.palette.warning.main,
            }}
          />
        )}
        {/* Render empty stars */}
        {Array.from({ length: emptyStars }).map((_, i) => (
          <StarOutlineIcon
            key={`empty-${i}`}
            sx={{
              fontSize: "14px",
              color: theme.palette.grey.main,
            }}
          />
        ))}
      </>
    );
  };

  return (
    <>
      <div className="client-image">
        <Box
          sx={{
            my: {
              xs: 3,
              md: 4,
            },
            py: { xs: 2 },
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              width: "100%",
              my: {
                xs: 2,
                md: 3,
              },
            }}
          >
            <Typography
              variant="h5"
              gutterBottom
              sx={{ fontWeight: "bold", color: theme.palette.white.main }}
            >
              What our clients say
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
            <Slider {...settings}>
              {review.map((testimonial) => (
                <Box key={testimonial.id}>
                  <Box
                    sx={{
                      mx: 2,
                      p: 3,
                      borderBottom: `4px solid ${theme.palette.primary.main}`,
                      textAlign: "center",
                    }}
                    className="testimonial-card"
                  >
                    <Avatar
                      src={testimonial.clientImage}
                      alt={testimonial.name}
                      sx={{
                        width: 80,
                        height: 80,
                        margin: "0 auto",
                        border: `3px double ${theme.palette.grey.main}`,
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
                      {/* Render the stars based on rating */}
                      {renderStars(testimonial.rating)}
                    </Box>
                    <Typography
                      variant="body2"
                      sx={{ my: 2, color: "text.secondary" }}
                    >
                      {testimonial.description}
                    </Typography>
                    <FormatQuoteIcon
                      fontSize="large"
                      sx={{ color: theme.palette.primary.main }}
                    />
                  </Box>
                </Box>
              ))}
            </Slider>
          </Container>
        </Box>
      </div>
    </>
  );
};

export default ClientTestimonial;
