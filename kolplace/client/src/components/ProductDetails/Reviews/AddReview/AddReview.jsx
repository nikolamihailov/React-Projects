import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./AddReview.module.css";
import { createReview } from "../../../../data/services/reviewService";
import { addReview } from "../../../../data/services/productService";
import { AuthContext } from "../../../../contexts/AuthContext";
import { NotifContext } from "../../../../contexts/NotificationContext";

const RATING_LABELS = ["Poor", "Fair", "Good", "Very good", "Excellent"];

const AddReview = ({ productId, reviews, onClose, updateProduct }) => {
  const [text, setText] = useState("");
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [errors, setErrors] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const { auth, isAuthenticated, updateAuth } = useContext(AuthContext);
  const { updateNotifs } = useContext(NotifContext);
  const navigateTo = useNavigate();
  const shown = hovered || rating;

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      updateNotifs([{ text: "You need to be signed in to add review!", type: "error" }]);
      navigateTo("/login");
      return;
    }
    const missing = [];
    if (!rating) missing.push("Please choose a rating.");
    if (!text.trim()) missing.push("Please write a few words about the product.");
    if (missing.length) return setErrors(missing);
    if (reviews.some((r) => r.author?._id === auth.user?._id)) {
      return setErrors(["You have already written a review on this product!"]);
    }

    setIsSaving(true);
    const review = await createReview({
      text: text.trim(),
      rating,
      author: auth.user?._id,
      product: productId,
    });
    if (review.expMessage) {
      setIsSaving(false);
      updateNotifs([{ text: review.expMessage, type: "error" }]);
      updateAuth({});
      navigateTo("/login");
      return;
    }
    if (review.errors) {
      setIsSaving(false);
      setErrors(Object.values(review.errors));
      return;
    }
    const updatedProduct = await addReview(productId, { reviewId: review._id });
    setIsSaving(false);
    updateProduct(updatedProduct);
    updateNotifs([{ text: "Your review has been added!", type: "success" }]);
    onClose();
  };

  return (
    <form className={styles["add-review"]} onSubmit={onSubmit} noValidate>
      <h3>Write a review</h3>

      {errors.length > 0 && (
        <ul className={styles["errors"]} role="alert">
          {errors.map((err) => (
            <li key={err}>{err}</li>
          ))}
        </ul>
      )}

      <fieldset className={styles["rating"]}>
        <legend>Your rating</legend>
        <div className={styles["stars"]} onMouseLeave={() => setHovered(0)}>
          {[1, 2, 3, 4, 5].map((value) => (
            <label key={value} onMouseEnter={() => setHovered(value)} title={RATING_LABELS[value - 1]}>
              <input
                type="radio"
                name="rating"
                value={value}
                checked={rating === value}
                onChange={() => {
                  setRating(value);
                  setErrors([]);
                }}
                aria-label={`${value} star${value > 1 ? "s" : ""} - ${RATING_LABELS[value - 1]}`}
              />
              <i className={`${value <= shown ? "fa-solid" : "fa-regular"} fa-star`} aria-hidden="true"></i>
            </label>
          ))}
          <span className={styles["rating-label"]} aria-hidden="true">
            {shown ? RATING_LABELS[shown - 1] : "Select a rating"}
          </span>
        </div>
      </fieldset>

      <label className={styles["field"]}>
        Your review
        <textarea
          name="text"
          value={text}
          maxLength={1000}
          placeholder="What did you like or dislike? How did you use it?"
          onChange={(e) => {
            setText(e.target.value);
            setErrors([]);
          }}
        />
        <span className={styles["counter"]}>{text.length}/1000</span>
      </label>

      <div className={styles["actions"]}>
        <button type="button" className={styles["secondary"]} onClick={onClose}>
          Cancel
        </button>
        <button type="submit" className={styles["primary"]} disabled={isSaving}>
          {isSaving ? "Submitting..." : "Submit review"}
        </button>
      </div>
    </form>
  );
};

export default AddReview;
