import styles from "./Categories.module.css";

const Categories = () => {
  return (
    <div className={styles["categories-btn-container"]}>
      <i className="fa-solid fa-list"></i>
      <button>Categories</button>
    </div>
  );
};

export default Categories;
