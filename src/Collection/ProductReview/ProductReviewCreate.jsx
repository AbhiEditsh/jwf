
const ProductReview = ({ productId }) => {
  const [rating, setRating] = useState(0);
  const dispatch = useDispatch();

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
    </Container>
  );
};

export default ProductReview;
