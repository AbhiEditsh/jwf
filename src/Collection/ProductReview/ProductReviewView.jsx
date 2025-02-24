import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Typography,
  Box,
  Grid,
  CircularProgress,
} from "@mui/material";
import Rating from "@mui/material/Rating";
import { format } from "date-fns";
import theme from "../../theme/theme";

const ProductReviewView = ({ productId }) => {
  const dispatch = useDispatch();
  const { reviews, loading, error } = useSelector((state) => state.userReviews);
  const userId = JSON.parse(localStorage.getItem("user"))._id;

  useEffect(() => {
    dispatch(fetchUserReviews(userId, productId));
  }, [dispatch, userId, productId]);

  return (
    <Container>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography variant="body1" color="error">
          {error}
        </Typography>
      ) : (
        <Grid container spacing={2}>
          {reviews.map((review) => (
            <Grid item xs={12} key={review._id}>
              <Box
                sx={{
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  padding: "16px",
                  marginBottom: "16px",
                }}
              >
                <Rating name="read-only" value={review.rating} readOnly />
                <Typography variant="body1">{review.comment}</Typography>
              </Box>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default ProductReviewView;
