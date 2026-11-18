import { Link } from "react-router-dom";
import useTitle from "../../../hooks/useTitle";
import styles from "./OrderComplete.module.css";

const OrderComplete = () => {
  useTitle("Order Complete | KolPlace");
  return (
    <section className={styles["page"]}>
      <div className={styles["card"]}>
        <span className={styles["icon"]} aria-hidden="true">
          <i className="fa-solid fa-check"></i>
        </span>
        <p className={styles["eyebrow"]}>Order placed</p>
        <h1 className={styles["title"]}>Thank you for your order!</h1>
        <p className={styles["text"]}>
          Your order is on the way. You can follow it and see its details at
          any time in My orders.
        </p>
        <div className={styles["actions"]}>
          <Link to="/" className={`${styles["button"]} ${styles["primary"]}`}>
            Continue shopping
          </Link>
          <Link
            to="/my-orders"
            className={`${styles["button"]} ${styles["secondary"]}`}
          >
            View my orders
          </Link>
        </div>
      </div>
    </section>
  );
};

export default OrderComplete;
