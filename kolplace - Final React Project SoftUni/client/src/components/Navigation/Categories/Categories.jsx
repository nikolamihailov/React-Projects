import styles from "./Categories.module.css";
import CategoriesDropdown from "./CategoriesDropdown/CategoriesDropdown";
import { useShowHide } from "../../../hooks/useShowHide";
import { getAll } from "../../../data/services/categoryService";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { NotifContext } from "../../../contexts/NotificationContext";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const { isOpen, mouseEnter, mouseLeave } = useShowHide();
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
      .catch((err) => console.log(err));
  }, [navigateTo, updateAuth, updateNotifs]);

  return (
    <div
      className={styles["categories-btn-container"]}
      onMouseEnter={mouseEnter}
      onMouseLeave={mouseLeave}
    >
      <i className="fa-solid fa-list"></i>
      <button>Categories</button>
      {isOpen && <CategoriesDropdown categories={categories} />}
    </div>
  );
};

export default Categories;
