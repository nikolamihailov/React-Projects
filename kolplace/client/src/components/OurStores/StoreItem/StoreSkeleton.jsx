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
            width="15.625rem"
            height="15.625rem"
            style={{ marginBottom: "1.875rem", borderRadius: "0.625rem" }}
          />
          <h2>
            <h2>
              <i className="fa-solid fa-location-dot"></i>
              <Skeleton width="6.25rem" />
            </h2>
          </h2>
        </motion.div>
      );
    });
}

export default StoreSkeleton;
