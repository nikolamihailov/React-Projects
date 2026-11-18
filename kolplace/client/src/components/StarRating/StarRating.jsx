import styles from "./StarRating.module.css";

// Five stars with half steps, plus a screen-reader label with the exact score.
const StarRating = ({ value, size = "sm" }) => {
  const rounded = Math.round(value * 2) / 2;
  const stars = Array.from({ length: 5 }, (_, i) => {
    if (rounded >= i + 1) return "fa-solid fa-star";
    if (rounded === i + 0.5) return "fa-solid fa-star-half-stroke";
    return "fa-regular fa-star";
  });
  return (
    <span
      className={`${styles["stars"]} ${styles[size]}`}
      role="img"
      aria-label={`Rated ${value.toFixed(1)} out of 5`}
    >
      {stars.map((cls, i) => (
        <i key={i} className={cls} aria-hidden="true"></i>
      ))}
    </span>
  );
};

export default StarRating;
