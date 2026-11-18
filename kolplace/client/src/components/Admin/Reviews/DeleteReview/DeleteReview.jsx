import { useContext, useEffect, useState } from "react";
import { ConfirmDialog } from "../../AdminModal/AdminModal";
import { useNavigate } from "react-router-dom";
import { NotifContext } from "../../../../contexts/NotificationContext";
import { AuthContext } from "../../../../contexts/AuthContext";
import { deleteReview, getOne } from "../../../../data/services/reviewService";

const DeleteReview = ({ onClose, id, updateReviews }) => {
  const [review, setReview] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isBusy, setIsBusy] = useState(false);
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
    const deletedReview = await deleteReview(id);
    if (deletedReview.expMessage) {
      updateNotifs([{ text: deletedReview.expMessage, type: "error" }]);
      navigateTo("/login");
      updateAuth({});
      return;
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
  const confirmDelete = async () => {
    setIsBusy(true);
    try {
      await onDelete();
    } finally {
      setIsBusy(false);
    }
  };

  return (
    <ConfirmDialog
      title="Delete review"
      onConfirm={confirmDelete}
      onClose={onClose}
      isLoading={isLoading}
      isBusy={isBusy}
    >
      <p>
          Delete the review by <strong>{review?.author?.firstName}</strong> on{" "}
          <strong>{review?.product?.name}</strong>? This can&apos;t be undone.
        </p>
    </ConfirmDialog>
  );
};

export default DeleteReview;
