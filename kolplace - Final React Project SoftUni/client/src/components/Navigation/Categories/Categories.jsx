// import { useState } from "react";
import styles from "./Categories.module.css";
import CategoriesDropdown from "./CategoriesDropdown/CategoriesDropdown";

const Categories = () => {
  /*   const [isDropdownOpen, setIsDropDownOpen] =
    useState(true); */

  /*   const handleMouseEnter = () => {
    setIsDropDownOpen(true);
  };

  const handleMouseLeave = () => {
    setIsDropDownOpen(false);
  }; */

  return (
    <div
      className={styles["categories-btn-container"]}
      /*  onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave} */
    >
      <i className="fa-solid fa-list"></i>
      <button>Categories</button>
      {1 === 1 && <CategoriesDropdown />}
    </div>
  );
};

export default Categories;
