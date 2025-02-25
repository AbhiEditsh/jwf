import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Typography,
  Box,
  Grid,
  CircularProgress,
  Avatar,
  LinearProgress,
} from "@mui/material";
import Rating from "@mui/material/Rating";
import { getProductReviews } from "../../redux/actions/productActions";
import { format } from "date-fns";
import theme from "../../theme/theme";

const ProductReviewView = ({ productId }) => {
  const dispatch = useDispatch();
  const { reviews, loading, error } = useSelector(
    (state) => state.productReviews
  );

  const [ratingCounts, setRatingCounts] = useState({});

  useEffect(() => {
    dispatch(getProductReviews(productId));
  }, [dispatch, productId]);

  useEffect(() => {
    if (reviews.length) {
      const counts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
      reviews.forEach((review) => {
        counts[review.rating]++;
      });
      setRatingCounts(counts);
    }
  }, [reviews]);

  const totalReviews = reviews.length;
  const averageRating =
    totalReviews > 0
      ? (reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews).toFixed(1)
      : 0;

  const getPercentage = (count) => (totalReviews ? (count / totalReviews) * 100 : 0);

  return (
    <Container>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography variant="body1" color="error">
          {error}
        </Typography>
      ) : totalReviews === 0 ? (
        <Typography variant="body1" color="textSecondary">
          No reviews found
        </Typography>
      ) : (
        <>
          <Box display="flex" alignItems="center" mb={3}>
            <Typography variant="h3" mr={2}>{averageRating}</Typography>
            <Rating value={parseFloat(averageRating)} precision={0.1} readOnly />
            <Typography variant="body1" ml={1}>({totalReviews} Ratings)</Typography>
          </Box>

          {[5, 4, 3, 2, 1].map((star) => (
            <Box key={star} display="flex" alignItems="center" mb={1}>
              <Typography variant="body2">{star} ★</Typography>
              <Box sx={{ flex: 1, mx: 1 }}>
                <LinearProgress
                  variant="determinate"
                  value={getPercentage(ratingCounts[star] || 0)}
                  sx={{ height: 8, borderRadius: 5 }}
                />
              </Box>
              <Typography variant="body2">
                {getPercentage(ratingCounts[star] || 0).toFixed(0)}%
              </Typography>
            </Box>
          ))}

          <Grid container spacing={2} mt={3}>
            {reviews.map((review) => (
              <Grid item xs={12} key={review._id}>
                <Box
                  sx={{
                    border: `1px solid ${theme.palette.grey[300]}`,
                    borderRadius: "8px",
                    padding: "16px",
                    marginBottom: "16px",
                  }}
                >
                  <Box display="flex" alignItems="center" mb={1}>
                    <Avatar>{review.userId.username.charAt(0).toUpperCase()}</Avatar>
                    <Box ml={2}>
                      <Typography variant="subtitle1">{review.userId.username}</Typography>
                      <Typography variant="body2" color="textSecondary">
                        {format(new Date(review.createdAt), "dd MMM yyyy")}
                      </Typography>
                    </Box>
                  </Box>

                  <Rating value={review.rating} readOnly size="small" />

                  <Typography variant="body1" mt={1}>{review.comment}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Container>
  );
};

export default ProductReviewView;
