import styles from "./CategoryItem.module.css";

const CategoryItem = ({ _id, name, categoryImage, openEdit }) => {
  return (
    <div className={styles["admin-category-item"]}>
      <h2>{name}</h2>
      <img src={categoryImage} alt={name} />
      <div>
        <button onClick={() => openEdit(_id)}>
          <i className="fa-solid fa-pen-to-square"></i>
        </button>
        <button>
          <i className="fa-solid fa-trash-can"></i>
        </button>
      </div>
    </div>
  );
};

export default CategoryItem;
