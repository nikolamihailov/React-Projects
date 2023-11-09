import styles from "./Categories.module.css";
import CategoriesDropdown from "./CategoriesDropdown/CategoriesDropdown";
import useDropdown from "../../../hooks/useDropdown";

const Categories = () => {
  const { isOpen, mouseEnter, mouseLeave } = useDropdown();

  return (
    <div
      className={styles["categories-btn-container"]}
      onMouseEnter={mouseEnter}
      onMouseLeave={mouseLeave}
    >
      <i className="fa-solid fa-list"></i>
      <button>Categories</button>
      {isOpen && <CategoriesDropdown />}
    </div>
  );
};

export default Categories;
