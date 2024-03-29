import { Link } from "react-router-dom";
import styles from "./CategoriesDropdown.module.css";

const CategoriesDropdownMobile = ({ categories, onClose }) => {
  return (
    <ul className={styles["categories-dropdown"]}>
      {categories.map((c) => (
        <Link
          to={`/categories/${c.name.toLowerCase()}`}
          key={c._id}
          onClick={onClose}
        >
          <li>
            <span>{c.name}</span>
            <img src={c.categoryImage} alt={c.name} />
          </li>
        </Link>
      ))}
    </ul>
  );
};

export default CategoriesDropdownMobile;
