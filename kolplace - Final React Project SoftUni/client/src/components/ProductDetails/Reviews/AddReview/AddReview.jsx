import { useContext, useState } from "react";
import styles from "./AddReview.module.css";
import { createReview } from "../../../../data/services/reviewService";
import { AuthContext } from "../../../../contexts/AuthContext";
import { addReview } from "../../../../data/services/productService";
import Notification from "../../../Notifications/Notification";
import { v4 as uuidv4 } from "uuid";
import { NotifContext } from "../../../../contexts/NotificationContext";
import { useNavigate } from "react-router-dom";

const FORM_VALUES = {
  Text: "text",
  Rating: "rating",
};
let stars;

const AddReview = ({ productId, reviews, onClose, updateProduct }) => {
  const [values, setValues] = useState({
    [FORM_VALUES.Text]: "",
    [FORM_VALUES.Rating]: 1,
  });
  const [errors, setErrors] = useState([]);
  const { auth, isAuthenticated } = useContext(AuthContext);
  const { updateNotifs } = useContext(NotifContext);
  const navigateTo = useNavigate();

  stars = Array.from({ length: values[FORM_VALUES.Rating] }, (_, index) => (
    <i key={index} className="fa-solid fa-star"></i>
  ));

  const onChange = (e) => {
    const { name, value } = e.target;
    setErrors([]);
    setValues((state) => ({ ...state, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (isAuthenticated) {
      const body = {
        text: values.text,
        rating: Number(values.rating),
        author: auth.user?._id,
        product: productId,
      };
      const hasAddedReview = reviews.find(
        (r) => r.author._id === auth.user?._id
      );
      const review = await createReview(body);
      if (review.errors) {
        setErrors(Object.values(review.errors));
      } else {
        if (hasAddedReview) {
          setErrors(["You have already written a review on this product!"]);
          return;
        }
        const updatedProduct = await addReview(productId, {
          reviewId: review._id,
        });
        updateProduct(updatedProduct);
        updateNotifs([
          { text: "Your review has been added!", type: "success" },
        ]);
        onClose();
      }
    } else {
      updateNotifs([
        { text: "You need to be signed in to add review!", type: "error" },
      ]);
      navigateTo("/login");
    }
  };

  return (
    <>
      {/* <div className="backdrop" onClick={onClose}></div> */}
      <form className={styles["add-review"]} onSubmit={onSubmit}>
        <i className="fa-solid fa-x" onClick={onClose}></i>
        <div className={styles["form-group"]}>
          <label htmlFor={FORM_VALUES.Text}>Review</label>
          <textarea
            type="text"
            name={FORM_VALUES.Text}
            id={FORM_VALUES.Text}
            placeholder="Awesome product, I really like it :)!"
            onChange={onChange}
          ></textarea>
        </div>
        <div className={styles["form-group"]}>
          <label htmlFor={FORM_VALUES.Rating}>Rating</label>
          <select
            name={FORM_VALUES.Rating}
            id={FORM_VALUES.Rating}
            onChange={onChange}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
        <div className={styles["stars"]}>{stars}</div>
        <button type="submit">Add</button>
      </form>
      {errors.length > 0 && (
        <div className={styles["errors-container"]}>
          {errors.map((e) => (
            <Notification text={e} type={"error"} key={uuidv4()} />
          ))}
        </div>
      )}
    </>
  );
};

export default AddReview;
