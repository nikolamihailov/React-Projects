import styles from "./CategoryItem.module.css";

const CategoryItem = ({ name, categoryImage }) => {
  return (
    <div className={styles["admin-category-item"]}>
      <img src={categoryImage} alt={name} />
      <h2>{name}</h2>
    </div>
  );
};

export default CategoryItem;
