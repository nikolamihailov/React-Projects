import styles from "./Dropdown.module.css";
const CategoriesDropdown = ({ categories }) => {
  return (
    <ul className={styles["categories-dropdown"]}>
      {categories.map((c) => (
        <li key={c._id}>
          <span>{c.name}</span>
          <img src={c.categoryImage} alt={c.name} />
        </li>
      ))}
    </ul>
  );
};

export default CategoriesDropdown;
