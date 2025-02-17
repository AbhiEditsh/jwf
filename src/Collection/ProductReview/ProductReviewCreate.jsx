import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Box,
  Rating,
  Link,
} from "@mui/material";
import { SecondaryButton } from "../../Global/Button/MuiButton";
import { useDispatch, useSelector } from "react-redux";
import { createReview } from "../../redux/actions/productActions";
import theme from "../../theme/theme";
import { useNavigate } from "react-router-dom";

const ProductReview = ({ productId }) => {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));
  const { loading, success, error } = useSelector(
    (state) => state.reviewCreate
  );

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleRatingChange = (e, newValue) => {
    setRating(newValue);
  };

  const handleReview = (e) => {
    e.preventDefault();
    const review = {
      comment,
      rating,
      userId: user._id,
      productId,
    };
    dispatch(createReview(review));
  };

  return (
    <Container>
      <Typography variant="h6">Add a Review</Typography>
      {!user ? (
        <Typography variant="body1" color="textSecondary">
          You must be{" "}
          <Link
            style={{ color: theme.palette.black.main, cursor: "pointer" }}
            onClick={() => navigate("/login")}
          >
            logged in
          </Link>{" "}
          to post a review.
        </Typography>
      ) : (
        <>
          {loading && <p>Loading...</p>}
          {error && <p>Error: {error}</p>}
          {success && <p>Review submitted successfully!</p>}
          <form onSubmit={handleReview}>
            <Box my={2}>
              <Rating
                name="rating"
                value={rating}
                onChange={handleRatingChange}
                precision={0.5}
              />
            </Box>
            <Box my={2}>
              <TextField
                label="Comment"
                multiline
                fullWidth
                rows={4}
                variant="outlined"
                value={comment}
                onChange={handleCommentChange}
              />
            </Box>
            <Box my={2}>
              <SecondaryButton text="Submit Review" type="submit" />
            </Box>
          </form>
        </>
      )}
    </Container>
  );
};

export default ProductReview;
