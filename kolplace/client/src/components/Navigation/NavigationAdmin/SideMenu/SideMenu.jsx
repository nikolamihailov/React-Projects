import { NavLink } from "react-router-dom";
import styles from "./SideMenu.module.css";

const SideMenu = () => {
  return (
    <>
      <ul className={styles["side-menu-links"]}>
        <NavLink
          to={"/admin-panel/categories"}
          className={({ isActive, isPending }) =>
            isPending
              ? styles["pending"]
              : isActive
              ? styles["active-link"]
              : ""
          }
        >
          <li>
            <i className="fa-solid fa-list"></i>
            <span>Categories</span>
          </li>
        </NavLink>
        <NavLink
          to={"/admin-panel/products"}
          className={({ isActive, isPending }) =>
            isPending
              ? styles["pending"]
              : isActive
              ? styles["active-link"]
              : ""
          }
        >
          <li>
            <i className="fas fa-shopping-bag"></i>
            <span>Products</span>
          </li>
        </NavLink>
        <NavLink
          to={"/admin-panel/reviews"}
          className={({ isActive, isPending }) =>
            isPending
              ? styles["pending"]
              : isActive
              ? styles["active-link"]
              : ""
          }
        >
          <li>
            <i className="fas fa-star"></i>
            <span>Reviews</span>
          </li>
        </NavLink>
        <NavLink
          to={"/admin-panel/users"}
          className={({ isActive, isPending }) =>
            isPending
              ? styles["pending"]
              : isActive
              ? styles["active-link"]
              : ""
          }
        >
          <li>
            <i className="fas fa-users"></i>
            <span>Users</span>
          </li>
        </NavLink>
        <NavLink
          to={"/admin-panel/stores"}
          className={({ isActive, isPending }) =>
            isPending
              ? styles["pending"]
              : isActive
              ? styles["active-link"]
              : ""
          }
        >
          <li>
            <i className="fas fa-store-alt"></i>
            <span>Stores</span>
          </li>
        </NavLink>
        <NavLink
          to={"/admin-panel/statistics"}
          className={({ isActive, isPending }) =>
            isPending
              ? styles["pending"]
              : isActive
              ? styles["active-link"]
              : ""
          }
        >
          <li>
            <i className="fa-solid fa-chart-simple"></i>
            <span>Statistics</span>
          </li>
        </NavLink>
      </ul>
    </>
  );
};

export default SideMenu;
