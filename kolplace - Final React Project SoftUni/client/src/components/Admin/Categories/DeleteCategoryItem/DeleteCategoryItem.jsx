import { useContext, useEffect, useState } from "react";
import {
  getOneCategory,
  deleteCategory,
} from "../../../../data/services/categoryService";
import styles from "./DeleteCategory.module.css";
import { NotifContext } from "../../../../contexts/NotificationContext";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../../contexts/AuthContext";

const DeleteCategoryItem = ({ onClose, id, updateCategories }) => {
  const [category, setCategory] = useState(null);
  const navigateTo = useNavigate();
  const { updateNotifs } = useContext(NotifContext);
  const { updateAuth } = useContext(AuthContext);

  useEffect(() => {
    getOneCategory(id).then((data) => setCategory(data));
  }, [id]);

  const onDelete = async () => {
    const deletedCategory = await deleteCategory(id);
    if (deletedCategory.expMessage) {
      updateNotifs([{ text: deletedCategory.expMessage, type: "error" }]);
      navigateTo("/login");
      updateAuth({});
    }
    if (deletedCategory.hasProducts) {
      updateNotifs([{ text: deletedCategory.hasProducts, type: "error" }]);
      onClose();
      return;
    }
    if (deletedCategory.error) {
      updateNotifs([{ text: deletedCategory.error, type: "error" }]);
    } else {
      updateCategories((categs) =>
        categs.filter((c) => c._id !== deletedCategory._id)
      );
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
  return (
    <>
      <div className="backdrop" onClick={onClose}></div>
      <div className={styles["delete-category"]}>
        <p>
          Are you sure you want to delete <span>{category?.name}</span>{" "}
          category?
        </p>
        <div>
          <button onClick={onDelete}>Ok</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </>
  );
};

export default DeleteCategoryItem;
