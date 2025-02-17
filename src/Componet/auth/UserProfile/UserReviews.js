import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Avatar,
  Rating,
} from "@mui/material";
import { format } from "date-fns";
import { getUserReviews } from "../../../redux/actions/productActions";

const UserReviews = () => {
  const dispatch = useDispatch();
  const { reviews, loading, error } = useSelector((state) => state.userReviews);
  const userId = JSON.parse(localStorage.getItem("user"))._id;

  useEffect(() => {
    if (userId) {
      dispatch(getUserReviews(userId));
    }
  }, [dispatch, userId]);

  return (
    <Container>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography variant="body1" color="error">
          {error}
        </Typography>
      ) : reviews.length === 0 ? (
        <Typography variant="body1" color="textSecondary">
          No reviews found
        </Typography>
      ) : (
        <Box>
          {reviews.map((review) => (
            <Box
              key={review._id}
              sx={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: 1,
                marginBottom: 2,
              }}
            >
              <Box display="flex" alignItems="center">
                <Box>
                  <img
                    src={review?.productId?.ProductImage}
                    alt="images"
                    style={{
                      width: "80px",
                      height: "80px",
                      borderRadius: "10px",
                      marginRight: "10px",
                    }}
                  />
                </Box>
                <Box>
                  <Box>
                    <Rating
                      name="read-only"
                      value={review.rating}
                      readOnly
                      sx={{
                        fontSize: "14px",
                      }}
                    />{" "}
                    <span>({review.rating})</span>
                  </Box>
                  <Typography variant="body1">{review.comment}</Typography>
                  <Typography variant="caption">
                    {format(new Date(review.createdAt), "dd MMM yyyy")}
                  </Typography>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      )}
    </Container>
  );
};

export default UserReviews;
