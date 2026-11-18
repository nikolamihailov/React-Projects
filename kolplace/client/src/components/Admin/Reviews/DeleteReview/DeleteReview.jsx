import { useContext, useEffect, useState } from "react";
import styles from "./DeleteReview.module.css";
import { useNavigate } from "react-router-dom";
import { NotifContext } from "../../../../contexts/NotificationContext";
import { AuthContext } from "../../../../contexts/AuthContext";
import { deleteReview, getOne } from "../../../../data/services/reviewService";
import Spinner from "../../../Spinner/Spinner";

const DeleteReview = ({ onClose, id, updateReviews }) => {
  const [review, setReview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigateTo = useNavigate();
  const { updateNotifs } = useContext(NotifContext);
  const { updateAuth } = useContext(AuthContext);

  useEffect(() => {
    setIsLoading(true);
    getOne(id)
      .then((data) => {
        setReview(data);
      })
      .finally(() => setIsLoading(false));
  }, [id]);

  const onDelete = async () => {
    console.log(id);
    const deletedReview = await deleteReview(id);
    if (deletedReview.expMessage) {
      updateNotifs([{ text: deletedReview.expMessage, type: "error" }]);
      navigateTo("/login");
      updateAuth({});
    }
    if (deletedReview.error) {
      updateNotifs([{ text: deletedReview.error, type: "error" }]);
    } else {
      updateReviews((reviews) => reviews.filter((r) => r._id !== deletedReview._id));
      updateNotifs([
        {
          text: `Review by ${deletedReview.author.firstName} on ${deletedReview.product.name} deleted!`,
          type: "success",
        },
      ]);
      onClose();
      navigateTo("/admin-panel/reviews");
    }
  };
  return (
    <>
      <div className="backdrop" onClick={onClose}></div>
      <div className={styles["delete-review"]}>
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <p>
              Are you sure you want to delete review by
              <span> {review?.author.firstName}</span> on <span>{review?.product.name}</span>?
            </p>
            <div className={styles["btns"]}>
              <button onClick={onDelete}>Ok</button>
              <button onClick={onClose}>Cancel</button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default DeleteReview;
