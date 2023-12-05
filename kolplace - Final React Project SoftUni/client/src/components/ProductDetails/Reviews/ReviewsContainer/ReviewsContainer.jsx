import AddReview from "../AddReview/AddReview";
import styles from "./ReviewsContainer.module.css";
import { useShowHide } from "../../../../hooks/useShowHide";
import ReviewItem from "./ReviewItem/ReviewItem";

const ReviewsContainer = ({ productId, reviews, updateProduct }) => {
  const { isOpen, showHide } = useShowHide();
  return (
    <div className={styles["reviews-container"]} id="reviews">
      <div className={styles["review-title"]}>
        <h3>Reviews</h3>
        <span></span>
      </div>
      <span className={styles["want-to-add-review"]}>
        You have something to say?
      </span>
      <button onClick={showHide} className={styles["add"]}>
        Add Review
      </button>
      {isOpen && (
        <AddReview
          onClose={showHide}
          productId={productId}
          reviews={reviews}
          updateProduct={updateProduct}
        />
      )}
      <div className={styles["all-reviews"]}>
        {reviews?.length > 0 &&
          reviews.map((r) => {
            return <ReviewItem key={r._id} {...r} />;
          })}
        {reviews?.length === 0 && (
          <h3>This product does not have reviews yet!</h3>
        )}
      </div>
    </div>
  );
};

export default ReviewsContainer;
