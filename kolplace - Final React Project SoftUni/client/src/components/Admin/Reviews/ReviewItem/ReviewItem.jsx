import { formatDate } from "../../../../utils/dateFormatter";
import styles from "./ReviewItem.module.css";
import { motion } from "framer-motion";
import avatar from "../../../../assets/avatar.png";

const ReviewItem = ({
  _id,
  text,
  rating,
  author,
  createdAt,
  product,
  openDelete,
}) => {
  const stars = Array.from({ length: rating }, (_, index) => (
    <i key={index} className="fa-solid fa-star"></i>
  ));

  for (let i = 0; i < 5 - rating; i++) {
    stars.push(<i key={i + rating} className="fa-regular fa-star"></i>);
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      whileHover={{ scale: 1.01, y: -5, transition: 0.2 }}
      className={styles["review-item"]}
    >
      <div className={styles["author"]}>
        <img src={author.avatar ? author.avatar : avatar} alt="avatar" />
        <span>{author.firstName}</span>
      </div>
      <div className={styles["content"]}>
        <span>{stars}</span>
        <p>{text}</p>
      </div>
      <div className={styles["product"]}>
        <img src={product.mainImage} alt="product" />
      </div>
      <div className={styles["createdAt"]}>
        <span>{formatDate(createdAt)}</span>
      </div>
      <div className={styles["createdAt"]}>
        <button onClick={() => openDelete(_id)} title={"Delete Review"}>
          <i className="fa-solid fa-trash-can"></i>
        </button>
      </div>
    </motion.div>
  );
};

export default ReviewItem;
