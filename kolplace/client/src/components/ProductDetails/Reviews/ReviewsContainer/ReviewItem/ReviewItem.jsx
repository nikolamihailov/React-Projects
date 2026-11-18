import { formatDate } from "../../../../../utils/dateFormatter";
import styles from "./ReviewItem.module.css";
import avatar from "../../../../../assets/avatar.png";
import StarRating from "../../../../StarRating/StarRating";

const ReviewItem = ({ text, rating, author, createdAt }) => {
  const name = `${author.firstName} ${author.lastName}`;
  return (
    <article className={styles["review-item"]}>
      <div className={styles["header"]}>
        <img src={author.avatar || avatar} alt="" />
        <div className={styles["meta"]}>
          <span className={styles["name"]}>{name}</span>
          <time className={styles["date"]} dateTime={createdAt}>
            {formatDate(createdAt)}
          </time>
        </div>
      </div>
      <StarRating value={rating} />
      <p className={styles["text"]}>{text}</p>
    </article>
  );
};

export default ReviewItem;
