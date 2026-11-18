import styles from "../../ProductDetails.module.css";

const ProductRating = ({ reviews, scrollToReviews }) => {
  const totalRating = reviews.reduce((acc, rev) => {
    return acc + rev.rating;
  }, 0);
  const avgRating = totalRating / reviews.length;

  const stars = Array.from({ length: Math.round(avgRating) }, (_, index) => (
    <i key={index} className="fa-solid fa-star"></i>
  ));

  for (let i = 0; i < 5 - Math.round(avgRating); i++) {
    stars.push(
      <i key={i + Math.round(avgRating)} className="fa-regular fa-star"></i>
    );
  }

  if (reviews.length === 0) {
    const starsNoReviews = Array.from({ length: 5 }, (_, index) => (
      <i key={index} className="fa-regular fa-star"></i>
    ));
    return (
      <div onClick={scrollToReviews} className={styles["ratings-reviews"]}>
        <div>{starsNoReviews}</div>
        <p>No reviews</p>
      </div>
    );
  }

  return (
    <div onClick={scrollToReviews} className={styles["ratings-reviews"]}>
      <div>{stars}</div>
      <b>
        {avgRating.toFixed(1)}/5 ({reviews.length})
      </b>
    </div>
  );
};

export default ProductRating;
