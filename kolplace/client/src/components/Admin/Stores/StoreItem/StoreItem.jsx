import styles from "./StoreItem.module.css";
import { motion } from "framer-motion";

const StoreItem = ({ _id, city, storeImage, phone, openEdit, openDelete }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      whileHover={{ scale: 1.02, y: -10, transition: 0.2 }}
      className={styles["admin-store-item"]}
    >
      <div>
        <button onClick={() => openEdit(_id)} title={"Edit Item"}>
          <i className="fa-solid fa-pen-to-square"></i>
        </button>
        <button onClick={() => openDelete(_id)} title={"Delete Item"}>
          <i className="fa-solid fa-trash-can"></i>
        </button>
      </div>
      <img src={storeImage} alt={city + " store"} />
      <h2>{city}</h2>
      <p>{phone}</p>
    </motion.div>
  );
};

export default StoreItem;
