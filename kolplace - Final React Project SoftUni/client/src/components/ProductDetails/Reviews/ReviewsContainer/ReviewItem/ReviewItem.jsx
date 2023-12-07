import { formatDate } from "../../../../../utils/dateFormatter";
import styles from "./ReviewItem.module.css";

const ReviewItem = ({ text, rating, author, createdAt }) => {
  const stars = Array.from({ length: rating }, (_, index) => (
    <i key={index} className="fa-solid fa-star"></i>
  ));

  for (let i = 0; i < 5 - rating; i++) {
    stars.push(<i key={i + rating} className="fa-regular fa-star"></i>);
  }

  return (
    <div className={styles["review-item"]}>
      <div className={styles["author"]}>
        <img src={author.avatar} alt={author.firstName} />
        <span>
          {author.firstName} {author.lastName}
        </span>
      </div>
      <div className={styles["content"]}>
        <span>{stars}</span>
        <p>{text}</p>
      </div>
      <div className={styles["created"]}>
        <p>{formatDate(createdAt)}</p>
      </div>
    </div>
  );
};

export default ReviewItem;
