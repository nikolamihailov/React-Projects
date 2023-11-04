import styles from "./MainNav.module.css";
import Categories from "../Categories/Categories";

const MainNav = () => {
  return (
    <nav className={styles["main-nav"]}>
      <div className={styles["categories-container"]}>
        <Categories />
      </div>
      <ul>
        <li>Promotions</li>
        <li>Contacts</li>
        <li>Our stores</li>
      </ul>
    </nav>
  );
};
export default MainNav;
