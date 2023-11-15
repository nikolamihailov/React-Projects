import styles from "./MainNav.module.css";
import Categories from "../Categories/Categories";
import { NavLink } from "react-router-dom";

const MainNav = () => {
  return (
    <nav className={styles["main-nav"]}>
      <div className={styles["categories-container"]}>
        <Categories />
      </div>
      <ul className={styles["links"]}>
        <NavLink
          to="/promotions"
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
      </ul>
    </nav>
  );
};
export default MainNav;
