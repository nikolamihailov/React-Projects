import styles from "./Store.module.css";
import { motion } from "framer-motion";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function StoreSkeleton({ stores }) {
  return Array(stores)
    .fill(0)
    .map((_, idx) => {
      return (
        <motion.li
          layout
          className={styles["store-item"]}
          exit={{ opacity: 0 }}
          key={idx}
          aria-hidden="true"
        >
          <div className={styles["image"]}>
            <Skeleton height="100%" style={{ display: "block", borderRadius: 0 }} />
          </div>
          <div className={styles["body"]}>
            <Skeleton width="9rem" height="1.4rem" />
            <Skeleton width="7rem" />
            <Skeleton height="2.75rem" style={{ borderRadius: "0.9rem" }} />
          </div>
        </motion.li>
      );
    });
}

export default StoreSkeleton;
