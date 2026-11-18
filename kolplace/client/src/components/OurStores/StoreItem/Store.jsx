import styles from "./Store.module.css";
import { motion } from "framer-motion";

const Store = ({ _id, city, phone, storeImage, openBigMap }) => {
  return (
    <motion.li
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={styles["store-item"]}
    >
      <div className={styles["image"]}>
        <img src={storeImage} alt={city + " store"} loading="lazy" />
      </div>
      <div className={styles["body"]}>
        <h2>KolPlace {city}</h2>
        {phone && (
          <a className={styles["phone"]} href={`tel:${phone}`}>
            <i className="fa-solid fa-phone" aria-hidden="true"></i>
            {phone}
          </a>
        )}
        <button
          type="button"
          className={styles["map-btn"]}
          onClick={() => openBigMap(_id)}
        >
          <i className="fa-solid fa-location-dot" aria-hidden="true"></i>
          Show on map
        </button>
      </div>
    </motion.li>
  );
};

export default Store;
