import styles from "./Dropdown.module.css";
const CategoriesDropdown = () => {
  return (
    <ul className={styles["categories-dropdown"]}>
      <li>
        <i className="fa-solid fa-gamepad"></i>
        <span>Games</span>
      </li>
      <li>
        <i className="fa-solid fa-mobile-screen"></i>
        <span>Smartphones</span>
      </li>
      <li>
        <i className="fa-solid fa-laptop"></i>
        <span>Laptops</span>
      </li>
      <li>
        <i className="fa-solid fa-tv"></i>
        <span> TVs</span>
      </li>
      <li>
        <i className="fa-solid fa-book"></i>
        <span>Books</span>
      </li>
      <li>
        <i className="fa-solid fa-basketball"></i>
        <span>Sports</span>
      </li>
    </ul>
  );
};

export default CategoriesDropdown;
