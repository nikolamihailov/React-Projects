import styles from "./Store.module.css";
import { motion } from "framer-motion";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function StoreSkeleton({ stores }) {
  return Array(stores)
    .fill(0)
    .map((_, idx) => {
      return (
        <motion.div layout className={styles["store-item"]} exit={{ opacity: 0 }} key={idx}>
          <Skeleton
            width={250}
            height={250}
            style={{ marginBottom: "30px", borderRadius: "10px" }}
          />
          <h2>
            <h2>
              <i className="fa-solid fa-location-dot"></i>
              <Skeleton width={100} />
            </h2>
          </h2>
        </motion.div>
      );
    });
}

export default StoreSkeleton;
