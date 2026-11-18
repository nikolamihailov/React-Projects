import styles from "./ListToolbar.module.css";

// Bar above a product list: filters on the left, result count on the right.
const ListToolbar = ({ filters, count, label }) => (
  <div className={styles["toolbar"]}>
    <div className={styles["filters"]}>{filters}</div>
    <p className={styles["count"]}>
      <strong>{count}</strong> {label}
    </p>
  </div>
);

export default ListToolbar;
