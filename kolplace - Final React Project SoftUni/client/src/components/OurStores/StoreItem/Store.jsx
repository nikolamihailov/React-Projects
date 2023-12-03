import styles from "./Store.module.css";
import { motion } from "framer-motion";

const Store = ({ _id, city, storeImage, openBigMap }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      whileHover={{ scale: 1.02, y: -10, transition: 0.2 }}
      className={styles["store-item"]}
      onClick={() => openBigMap(_id)}
    >
      <img src={storeImage} alt={city + " store"} />
      <h2>
        <i className="fa-solid fa-location-dot"></i>
        {city}
      </h2>
    </motion.div>
  );
};

export default Store;
