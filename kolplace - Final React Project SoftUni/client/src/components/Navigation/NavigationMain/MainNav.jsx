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
        <NavLink to="/promotions">
          <li>Promotions</li>
        </NavLink>
        <NavLink to="/about-us">
          <li>About Us</li>
        </NavLink>
        <NavLink to="/our-stores">
          <li>Our Stores</li>
        </NavLink>
      </ul>
    </nav>
  );
};
export default MainNav;
