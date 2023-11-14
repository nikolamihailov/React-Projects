import { Link } from "react-router-dom";
import styles from "./SideMenu.module.css";

const SideMenu = () => {
  return (
    <>
      <ul className={styles["side-menu-links"]}>
        <Link to={"/admin-panel/categories"}>
          <li>
            <i className="fa-solid fa-list"></i>
            <span>Categories</span>
          </li>
        </Link>
        <Link to={"/admin-panel/products"}>
          <li>
            <i className="fas fa-shopping-bag"></i>
            <span>Products</span>
          </li>
        </Link>
        <Link to={"/admin-panel/users"}>
          <li>
            <i className="fas fa-users"></i>
            <span>Users</span>
          </li>
        </Link>
        <Link to={"/admin-panel/stores"}>
          <li>
            <i className="fas fa-store-alt"></i>
            <span>Stores</span>
          </li>
        </Link>
      </ul>
    </>
  );
};

export default SideMenu;
