import styles from "./Categories.module.css";
import { getAll } from "../../../data/services/categoryService";
import { useContext, useEffect, useState } from "react";
import { NotifContext } from "../../../contexts/NotificationContext";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import AddCatgoryName from "./AddCategoryItem/AddCaregoryItem";
import CategoryItem from "./CategoryItem/CategoryItem";

const Categories = () => {
  const [categories, setCategories] = useState();
  const [isAddOpen, setIsAddOpen] = useState(false);
  const { updateAuth } = useContext(AuthContext);
  const navigateTo = useNavigate();
  const { updateNotifs } = useContext(NotifContext);

  useEffect(() => {
    getAll()
      .then((data) => {
        if (data.expMessage) {
          updateNotifs([{ text: data.expMessage, type: "error" }]);
          navigateTo("/login");
          updateAuth({});
        }
        setCategories(data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [navigateTo, updateNotifs, updateAuth]);

  const updateCategories = (data) => setCategories((state) => [...state, data]);
  const onClose = () => setIsAddOpen(false);

  return (
    <div className={styles["admin-categories"]}>
      <h1>All Categories</h1>
      <button onClick={() => setIsAddOpen((state) => !state)}>
        Add category <i className="fa-solid fa-circle-plus"></i>
      </button>
      <div className={styles["admin-categories-container"]}>
        {categories?.length > 0 ? (
          categories.map((c) => <CategoryItem key={c._id} {...c} />)
        ) : (
          <h2>No categories</h2>
        )}
      </div>
      {isAddOpen && (
        <AddCatgoryName updateCategories={updateCategories} onClose={onClose} />
      )}
    </div>
  );
};

export default Categories;
