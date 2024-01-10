import { NavLink } from "react-router-dom";
import styles from "../NavigationAside/NavigationAside.module.css";
import { useEffect, useState } from "react";

import { getAll } from "../../../../data/services/categoryService";
import CategoriesDropdownMobile from "../../Categories/CategoriesDropdownMobile/CategoriesDropdownMobile";
import { useShowHide } from "../../../../hooks/useShowHide";

const NavigationAside = ({ onClose }) => {
  const [categories, setCategories] = useState([]);
  const { isOpen, showHide } = useShowHide();

  useEffect(() => {
    getAll()
      .then((data) => {
        setCategories(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <div className="backdrop" onClick={onClose}></div>
      <aside className={styles["side-menu-mobile"]}>
        <i className="fa-solid fa-x" onClick={onClose}></i>
        <ul className={styles["links"]}>
          <NavLink
            to="/promotions"
            onClick={onClose}
            className={({ isActive, isPending }) =>
              isPending
                ? styles["pending"]
                : isActive
                ? styles["active-link"]
                : ""
            }
          >
            <li>Promotions</li>
          </NavLink>
          <NavLink
            to="/about-us"
            onClick={onClose}
            className={({ isActive, isPending }) =>
              isPending
                ? styles["pending"]
                : isActive
                ? styles["active-link"]
                : ""
            }
          >
            <li>About Us</li>
          </NavLink>
          <NavLink
            to="/our-stores"
            onClick={onClose}
            className={({ isActive, isPending }) =>
              isPending
                ? styles["pending"]
                : isActive
                ? styles["active-link"]
                : ""
            }
          >
            <li>Our Stores</li>
          </NavLink>
          <li onClick={showHide}>Categories</li>
        </ul>
        {isOpen && (
          <CategoriesDropdownMobile categories={categories} onClose={onClose} />
        )}
      </aside>
    </>
  );
};

export default NavigationAside;
