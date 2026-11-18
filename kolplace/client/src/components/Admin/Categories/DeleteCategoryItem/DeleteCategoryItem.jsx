import { useContext, useEffect, useState } from "react";
import { getOneCategory, deleteCategory } from "../../../../data/services/categoryService";
import { ConfirmDialog } from "../../AdminModal/AdminModal";
import { NotifContext } from "../../../../contexts/NotificationContext";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../../contexts/AuthContext";

const DeleteCategoryItem = ({ onClose, id, updateCategories }) => {
  const [category, setCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isBusy, setIsBusy] = useState(false);
  const navigateTo = useNavigate();
  const { updateNotifs } = useContext(NotifContext);
  const { updateAuth } = useContext(AuthContext);

  useEffect(() => {
    setIsLoading(true);
    getOneCategory(id)
      .then((data) => setCategory(data))
      .finally(() => setIsLoading(false));
  }, [id]);

  const onDelete = async () => {
    const deletedCategory = await deleteCategory(id);
    if (deletedCategory.expMessage) {
      updateNotifs([{ text: deletedCategory.expMessage, type: "error" }]);
      navigateTo("/login");
      updateAuth({});
      return;
    }
    if (deletedCategory.hasProducts) {
      updateNotifs([{ text: deletedCategory.hasProducts, type: "error" }]);
      onClose();
      return;
    }
    if (deletedCategory.error) {
      updateNotifs([{ text: deletedCategory.error, type: "error" }]);
    } else {
      updateCategories((categs) => categs.filter((c) => c._id !== deletedCategory._id));
      updateNotifs([
        {
          text: `Category - ${deletedCategory.name} deleted!`,
          type: "success",
        },
      ]);
      onClose();
      navigateTo("/admin-panel/categories");
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
      title="Delete category"
      onConfirm={confirmDelete}
      onClose={onClose}
      isLoading={isLoading}
      isBusy={isBusy}
    >
      <p>
          Delete the <strong>{category?.name}</strong> category? A category that still has products
          can&apos;t be deleted.
        </p>
    </ConfirmDialog>
  );
};

export default DeleteCategoryItem;
