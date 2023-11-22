import styles from "./CategoryItem.module.css";
import { motion } from "framer-motion";

const CategoryItem = ({ _id, name, categoryImage, openEdit, openDelete }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={styles["admin-category-item"]}
    >
      <div>
        <button onClick={() => openEdit(_id)} title={"Edit Item"}>
          <i className="fa-solid fa-pen-to-square"></i>
        </button>
        <button onClick={() => openDelete(_id)} title={"Delete Item"}>
          <i className="fa-solid fa-trash-can"></i>
        </button>
      </div>
      <img src={categoryImage} alt={name} />
      <h2>{name}</h2>
    </motion.div>
  );
};

export default CategoryItem;
