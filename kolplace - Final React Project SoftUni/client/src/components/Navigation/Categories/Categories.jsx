import styles from "./Categories.module.css";
import CategoriesDropdown from "./CategoriesDropdown/CategoriesDropdown";
import { useShowHide } from "../../../hooks/useShowHide";
import { getAll } from "../../../data/services/categoryService";
import { useEffect, useState } from "react";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const { isOpen, mouseEnter, mouseLeave } = useShowHide();

  useEffect(() => {
    getAll()
      .then((data) => {
        setCategories(data);
      })
      .catch((err) => console.log(err));
  }, []);

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
