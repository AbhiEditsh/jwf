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

  useEffect(() => {

  return (
    <Container>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography variant="body1" color="error">
          {error}
        </Typography>
      ) : (
              </Box>
          ))}
      )}
    </Container>
  );
};

export default ProductReviewView;
